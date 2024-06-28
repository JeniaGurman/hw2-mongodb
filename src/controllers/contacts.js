import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id
  });
  res.status(200).json({
    status: 200,
    massage: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contactId  = req.params.contactId;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found student with id ${contactId}!`,
    data: contact,
  });
};
// export const createContactController = async (req, res, next) => {
//   // const body = { ...req.body, userId: req.user._id };
//   if (!req.body.name || !req.body.phoneNumber) {
//     next(createHttpError(400, 'Name and phoneNumber are required.'));
//     return;
//   }
//   const contact = await createContact(req.body, req.user._id);

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: contact,
//   });
// };

export const createContactController = async (req, res, next) => {
  const body = { ...req.body, userId: req.user._id };
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  if (!name) {
    next(createHttpError(400, 'Name is required'));
    return;
  }

  if (!phoneNumber) {
    next(createHttpError(400, 'phoneNumber is required'));
    return;
  }

  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};


export const upsertContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const result = await updateContact(contactId, body, req.user._id);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const result = await updateContact( contactId, req.user._id, body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(404).send();
};
