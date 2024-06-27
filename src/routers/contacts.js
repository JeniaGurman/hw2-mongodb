import { Router } from "express";
import { getContactsController, deleteContactController, upsertContactController, patchContactController, createContactController, getContactByIdController,  } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateId } from "../middlewares/validateId.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { checkRoles } from "../middlewares/checkRoles.js";
// import { ROLES } from "../constants/constans.js";

const router = Router();

router.use('/:contactId', validateId('contactId'));

router.use(authenticate);

// router.get('/', ctrlWrapper(getContactsController));

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema),
  ctrlWrapper(createContactController));

router.put('/:contactId', validateBody(createContactSchema) , ctrlWrapper(upsertContactController));

router.patch('/:contactId', validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)),

  router.delete('/:contactId', ctrlWrapper(deleteContactController));





export default router;
