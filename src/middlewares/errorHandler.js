export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({
    message,
  });
};

// // Імпортуємо клас HttpError для обробки помилок HTTP з відповідними статус-кодами
// import { HttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   // Перевірка, чи отримали ми помилку від createHttpError
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.name,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// };
