import { model, Schema } from "mongoose";
// import { Product } from '../../interfaces/interfaces';

interface IProduct {
  sku: number
  name: string
  price: number
}

const productSchema = new Schema<IProduct> ({
  sku:{
    type: Number,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true
  },
  price:{
    type: Number,
    require: true
  }
});

const ProductModel = model<IProduct>("products", productSchema);
export default ProductModel;