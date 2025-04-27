// src/services/students.js

import { SORT_ORDER } from '../constants/contacts.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

//функція пошуку всіх контактів в базі даних
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//функція пошуку контакта по його ID в базі даних
export const getContactsById = async (userId, contactId) => {
  const contact = await ContactsCollection.findOne({ userId, _id: contactId });
  return contact;
};

//функція запису нового контакту в базу даних
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

//функція видалення контакту по ідентифікатору (contactId) з бази даних
export const deleteContact = async (userId, contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    userId,
    _id: contactId,
  });
  return contact;
};

//функція оновлення даних контакту по ідентифікатору (contactId) в базі даних
export const updateContact = async (
  userId,
  contactId,
  payload,
  options = {},
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { userId, _id: contactId },
    payload,
    {
      // new: true, //Перенесено в хук моделі //Повертає документ після оновлення
      // runValidators: true, //Перенесено в хук моделі //Включення валідатора mongoose при оновленні даних
      includeResultMetadata: true, //// Повертає додаткові властивості операції, а не лише документа
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
