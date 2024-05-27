import { contacts } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return await contacts.find();
};

export const getContactById = async (id) => {
  return await contacts.findById(id);
};
