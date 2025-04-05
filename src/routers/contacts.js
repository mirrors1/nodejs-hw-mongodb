import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

// Маршрут для обробки GET-запитів на '/contacts'
router.get('/', ctrlWrapper(getContactsController));

// Маршрут для обробки GET-запитів на '/contacts/:contactId'
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// Маршрут для обробки POST-запитів на '/contacts'
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// Маршрут для обробки DELETE-запитів на '/contacts/:contacttId'
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

// Маршрут для обробки PATCH-запитів на '/contacts/:contacttId'
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
