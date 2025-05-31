// context/ContactsContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Contacts from 'expo-contacts';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

type ContactType = Contacts.Contact;
type ContactsContextType = {
  contacts?: ContactType[];
};

const ContactsContext = createContext<ContactsContextType>({} as ContactsContextType);

export const useContacts = (): ContactsContextType => {
  const value = useContext(ContactsContext);
  if (!value) {
    throw new Error("useContacts must be used within a <ContactsProvider />");
  }
  return value;
};

type ContactsProviderProps = {
  children: React.ReactNode;
};

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [contacts, setContacts] = useState<ContactType[]>();

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') return;

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      setContacts(data);

      try {
        console.log("Sending contacts to backend:", data.length, "contacts");

        const host = await SecureStore.getItemAsync('host');

        const promises = data.map(async (contact) => {
          axios.post(`${host}/api/update`, {
            "source": "contacts",
            "timestamp": `${Date.now() / 1000}`,
            "content": `I have ${contact.name} in my contacts. Their phone number is ${contact.phoneNumbers?.[0]?.number || 'unknown'}.`,
          });
        });
      } catch (err) {
        console.warn("Failed to send contacts:", err);
      }
    };

    SecureStore.getItemAsync("contacts").then(async (contacts) => {
      if (contacts !== "true") {
        console.debug("Apple Contacts is not enabled, skipping contacts data fetch.");
        return;
      }

      loadContacts();
    });
  }, []);

  const value = useMemo(() => ({ contacts }), [contacts]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};