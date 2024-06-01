import { Router } from "express";
import { getContactbyIdController, getContactsController, deleteContactController, upsertContactController, patchContactController, createContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactbyIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.put('/contact/contactId', ctrlWrapper(upsertContactController));

router.patch('/contact/contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/contactId', ctrlWrapper(deleteContactController));

export default router;
