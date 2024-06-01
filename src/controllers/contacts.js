import { createContacts, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";



export const getContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.json({
            status: 200,
            massage: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (err) {
        next(err);
    };
};

export const getContactbyIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
        message: `Successfully found student with id ${contactId}!`,
        data: contact,
    });
};
export const createContactController = async (req, res) => {
    const contact = await createContacts(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contacts',
        data: contact,
    });
};

export const upsertContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, { upsert: true, });
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
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully patched a contacts!',
        data: result.contact,
    });

};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(404).send();
};

