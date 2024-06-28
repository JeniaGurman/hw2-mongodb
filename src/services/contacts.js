import { Contacts } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/constans.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (userId) {
    contactsQuery.where({ userId: userId });
  };

  const [contactsCount, contacts] = await Promise.all([
    Contacts.find({ userId }).countDocuments(),
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

export const getContactById = async (contactId, userId) => {
  const contact = await Contacts.findOne({_id: contactId, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contacts.create({ ...payload, userId });
  return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
  const rawResult = await Contacts.findOneAndUpdate(
    { _id: contactId, userId},
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options
      },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }
  return rawResult.value;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contacts.findOneAndDelete({
    _id: contactId, userId
  });
  return contact;
};
