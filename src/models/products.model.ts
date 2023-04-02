import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import MongoModel from './MongoModel';

const productMongooseSchema = new Schema<IProduct>({
  productName: String,
  price: Number,
  category: String,
  description: String,
  productImageURL: String,
}, { versionKey: false });

// https://stackoverflow.com/questions/13699784/mongoose-v-property-hide

class ProductModel extends MongoModel<IProduct> {
  constructor(model = mongooseCreateModel('Product', productMongooseSchema)) {
    super(model);
  }
}

export default ProductModel;