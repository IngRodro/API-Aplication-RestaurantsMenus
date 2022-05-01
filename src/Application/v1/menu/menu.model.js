import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';
import { modelname as restaurantModelName } from '../../restaurant/restaurant.model';
import { modelname as productModelName } from '../../product/product.model';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('product');

const product = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: restaurantModelName,
    },
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: productModelName,
      }
    }],
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
product.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models[singularName]
  || mongoose.model(pluralName, product);
