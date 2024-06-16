import { createContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const createContactController = async (req, res, next) => {
  if (!req.body.name || !req.body.phoneNumber) {
    next(createHttpError(400, 'Name and phoneNumber are required.'));
    return;
  }
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
