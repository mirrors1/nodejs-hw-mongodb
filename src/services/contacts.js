// src/services/students.js

import { ContactsCollection } from '../db/models/contacts.js';

//функція пошуку всіх контактів в базі даних
export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

//функція пошуку контакта по його ID в базі даних
export const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

//функція запису нового контакту в базу даних
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

//функція видалення контакту по ідентифікатору (contactId) з бази даних
export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

//функція оновлення даних контакту по ідентифікатору (contactId) в базі даних
export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
