import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//У відповіді видаляємо пароль
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при запису нових даних
usersSchema.pre('findOneAndUpdate', setUpdateSettings); // Хук вмикає налаштування при оновленні даних
usersSchema.post('findOneAndUpdate', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при оновленні даних

export const UserCollection = model('users', usersSchema);
