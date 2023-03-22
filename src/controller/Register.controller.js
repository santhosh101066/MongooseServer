import { hashSync } from "bcrypt";
import { Register } from "../services/Register.service.js";

 export default async (req, res) => {
    try {
      console.log(req.body);
      req.body.password = hashSync(req.body.password, 10);
      req.body.type = "user";
      try {
        await Register(req.body)
        res.statusCode=201
        res.json({message:"Account Created Sucessfully"});
      } catch (e) {
        res.statusCode = 409;
        res.statusMessage = "Account Already Exist";
        res.end();
      }
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.statusMessage = "Internal error";
      res.end();
    }
  }