import { model, Schema } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при запису нових даних
contactsSchema.pre('findOneAndUpdate', setUpdateSettings); // Хук вмикає налаштування при оновленні даних
contactsSchema.post('findOneAndUpdate', handleSaveError); //Хук для повернення корректного статусу помилки при валідації mongoose при оновленні даних

export const ContactsCollection = model('contacts', contactsSchema);
