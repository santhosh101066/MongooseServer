import { Schema, model } from "mongoose";

const Product = new Schema({
  short_title: String,
  title: String,
  quantity: String,
  more_details: String,
  category: String,
  price: String,
  filesCount: Number,
});

export default model("product", Product);
