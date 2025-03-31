import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Маршрут для обробки GET-запитів на '/contacts'
router.get('/contacts', ctrlWrapper(getContactsController));

// Маршрут для обробки GET-запитів на '/contacts/:contactId'
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

// Маршрут для обробки POST-запитів на '/contacts'
router.post('/contacts', ctrlWrapper(createContactController));

// Маршрут для обробки DELETE-запитів на '/contacts/:contacttId'
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

// Маршрут для обробки PATCH-запитів на '/contacts/:contacttId'
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;
