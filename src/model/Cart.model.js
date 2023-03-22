import { Schema, model } from "mongoose";

const Cart = Schema({
    p_id:String,
    user_id:String,
    quantity:Number
})

export default model("cart",Cart)