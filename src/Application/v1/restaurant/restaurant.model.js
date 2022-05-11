import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('restaurant');

const restaurant = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    department: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    delivery: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    openingHour: {
      type: String,
      required: true,
    },
    closingHour: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
restaurant.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, restaurant);
