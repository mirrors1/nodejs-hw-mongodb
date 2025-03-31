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
router.get('/', ctrlWrapper(getContactsController));

// Маршрут для обробки GET-запитів на '/contacts/:contactId'
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// Маршрут для обробки POST-запитів на '/contacts'
router.post('/', ctrlWrapper(createContactController));

// Маршрут для обробки DELETE-запитів на '/contacts/:contacttId'
router.delete('/:contactId', ctrlWrapper(deleteContactController));

// Маршрут для обробки PATCH-запитів на '/contacts/:contacttId'
router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;
