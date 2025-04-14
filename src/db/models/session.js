import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionsSchema.post('save', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при запису нових даних
sessionsSchema.pre('findOneAndUpdate', setUpdateSettings); // Хук вмикає налаштування при оновленні даних
sessionsSchema.post('findOneAndUpdate', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при оновленні даних

export const SessionCollection = model('sessions', sessionsSchema);
