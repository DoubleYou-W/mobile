import * as SecureStore from 'expo-secure-store';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';

const LOCATION_TASK_NAME = 'background-location-task';

let last_location: any = null;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }

  if (data) {
    const { locations } = data as any;
    const location = locations[0];

    const reverse = await axios.get(`https://eu1.locationiq.com/v1/reverse?key=REPLACE_WITH_API_KEY&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json&accept-language=en`);

    const name = reverse.data.display_name;

    if (last_location == null) {
      last_location = name;
    } else {
      if (last_location == name) {
        return
      }
    }

    if (location) {
      const host = await SecureStore.getItemAsync('host');

      try {
        await axios.post(`${host}/api/update`, {
          "source": "location",
          "timestamp": `${location.timestamp / 1000}`,
          "content": `Currently (${new Date(location.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',            
          })}) I am at ` + name,
        })       
      } catch (err) {
        console.warn('Failed to send location to server:', err);
      }
    }
  }
});

export { LOCATION_TASK_NAME };