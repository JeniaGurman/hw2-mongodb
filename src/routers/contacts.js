import { Router } from "express";
import { getContactsController, deleteContactController, upsertContactController, patchContactController, createContactController, getContactByIdController,  } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateId } from "../middlewares/validateId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/constans.js";

const router = Router();

router.use(authenticate);

router.use('/:contactId', validateId('contactId'));

router.get('/', checkRoles(ROLES.TEACHER),  ctrlWrapper(getContactsController));

router.get('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), ctrlWrapper(getContactByIdController));

router.post('/', checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController));

router.put('/:contactId', checkRoles(ROLES.TEACHER), validateBody(createContactSchema) , ctrlWrapper(upsertContactController));

router.patch('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)),

  router.delete('/:contactId', checkRoles(ROLES.TEACHER), ctrlWrapper(deleteContactController));



// router.get('/', ctrlWrapper(getContactsController));



export default router;
