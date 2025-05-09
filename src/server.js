// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/photo.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

// Читаємо змінну оточення PORT, якщо відсутня - 3000 по замовчуванні
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах. Наприклад, у запитах POST або PATCH
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

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

  //middleware для роботи з Cookies
  app.use(cookieParser());

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    res.json({
      message:
        'Hello! This API is designed to store and process your contacts.',
    });
  });

  //middleware для збереження та роздачі статичних файлів (зображень)
  app.use('/uploads', express.static(UPLOAD_DIR));

  //middleware для отримання документації
  app.use('/api-docs', swaggerDocs());

  //middleware для обробки контактів
  app.use('/contacts', contactsRouter);

  //middleware для обробки користувачів
  app.use('/auth', authRouter);

  //middleware для обробки випадку, коли клієнт звертається до неіснуючого маршруту
  app.use('*', notFoundHandler);

  // Middleware для обробких помилок (приймає 4 аргументи)
  app.use(errorHandler);

  // Запуск серверу
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
