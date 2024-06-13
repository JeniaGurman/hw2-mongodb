import { Router } from "express";
import { getContactsController, deleteContactController, upsertContactController, patchContactController, createContactController, getContactByIdController,  } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateId } from "../middlewares/validateId.js";

const router = Router();

router.use('/contacts/:contactId', validateId('contactId'));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController));

router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)),

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
