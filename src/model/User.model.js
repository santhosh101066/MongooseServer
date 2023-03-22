import { Schema, model } from "mongoose";

const user = new Schema({
  first_name: String,
  last_name: String,
  mobileno: String,
  email: { type: String, index:{unique:true} },
  password: String,
  type: String,
});

export default model("users", user);
