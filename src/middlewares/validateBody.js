import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      //щоб отримати всі можливі помилки валідації, а не першу з них
      abortEarly: false,
    });
    next();
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};
