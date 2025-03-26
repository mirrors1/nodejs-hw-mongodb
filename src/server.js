// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

// Читаємо змінну оточення PORT, якщо відсутня - 3000 по замовчуванні
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах. Наприклад, у запитах POST або PATCH
  app.use(express.json());

  //middleware CORS щоб дозволити вебзапитам отримувати ресурси з іншого домену
  app.use(cors());

  //middleware з налаштуванням логгеру через об’єкт властивостей.
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  // Маршрут для обробки GET-запитів на '/contacts'
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  // Маршрут для обробки GET-запитів на '/contacts/:contactId'
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  //middleware для обробки випадку, коли клієнт звертається до неіснуючого маршруту
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обробких помилок (приймає 4 аргументи)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Запуск серверу
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
