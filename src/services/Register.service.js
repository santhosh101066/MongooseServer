import UserModel from "../model/User.model.js";

export const Register=async(body)=>UserModel.create(body)