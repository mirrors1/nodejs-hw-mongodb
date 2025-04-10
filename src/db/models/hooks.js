//Хук повертає корректний статус помилки
export const handleSaveError = (error, doc, next) => {
  error.status = 400;
  next();
};

//Хук вмикає налаштування
export const setUpdateSettings = function (next) {
  this.options.new = true; //повертати оновлений документ
  this.options.runValidators = true; //вмикати валідацію mongoose при оновлені даних
  next();
};
