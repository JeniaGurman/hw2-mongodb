import { Contacts } from '../db/models/contacts.js';
// import { Contacts } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return await Contacts.find();
};

export const getContactById = async (id) => {
  return await Contacts.findById(id);
};
export const createContacts = async (payload) => {
  const contacts = await Contacts.create(payload);
  return contacts;

};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contacts.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contacts.findOneAndDelete({ _id: contactId });
  return contact;

};
