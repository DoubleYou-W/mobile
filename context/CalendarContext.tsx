// context/CalendarContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Calendar from 'expo-calendar';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

type CalendarEvent = Calendar.Event;
type CalendarContextType = {
  events?: CalendarEvent[];
};

const CalendarContext = createContext<CalendarContextType>({} as CalendarContextType);

export const useCalendar = (): CalendarContextType => {
  const value = useContext(CalendarContext);
  if (!value) {
    throw new Error("useCalendar must be used within a <CalendarProvider />");
  }
  return value;
};

type CalendarProviderProps = {
  children: React.ReactNode;
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>();

  useEffect(() => {
    const loadCalendarEvents = async () => {

      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') return;

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calendarIds = calendars.map((c) => c.id);

      const now = new Date();
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(now.getDate() + 7);

      const allEvents: CalendarEvent[] = [];

      for (const calendarId of calendarIds) {
        const calendarEvents = await Calendar.getEventsAsync(
          [calendarId],
          now,
          oneWeekFromNow
        );
        allEvents.push(...calendarEvents);
      }

      setEvents(allEvents);

      try {
        console.log("sending calendar events to backend", allEvents.length, "events");

        const host = await SecureStore.getItemAsync('host');
        
        const promises = allEvents.map(async (event) => {
          const startDate = event.startDate ? new Date(event.startDate) : new Date();
          const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default to 1 hour if no end date

          console.log(`I have the following calendar event: ${event.title || 'No Title'}\n` +
                     `Start: ${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n` +
                     `End: ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n` +
                     `Location: ${event.location || 'No Location'}\n` +
                     `Notes: ${event.notes || 'No Notes'}`)

          return axios.post(`${host}/api/update`, {
            source: "calendar",
            timestamp: `${startDate.getTime() / 1000}`,
            content: `I have the following calendar event: ${event.title || 'No Title'}\n` +
                     `Date: ${startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}\n` +
                     `Start: ${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n` +
                     `End: ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n` +
                     `Location: ${event.location || 'No Location'}\n` +
                     `Notes: ${event.notes || 'No Notes'}`,
          });
        });
      } catch (err) {
        console.warn("Failed to send calendar events:", err);
      }
    };

    SecureStore.getItemAsync("calendar").then(async (calendar) => {
      if (calendar !== "true") {
        console.debug("Apple Calendar is not enabled, skipping calendar data fetch.");
        return;
      }

      loadCalendarEvents();
    });
  }, []);

  const value = useMemo(() => ({ events }), [events]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};