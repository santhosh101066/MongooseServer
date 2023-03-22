import { compareSync } from "bcrypt";
import { jwtGenerator } from "../config/JWTGenerator.config.js";
import UserModel from "../model/User.model.js";

export default (data) =>
  new Promise((resolve, reject) => {
    UserModel.findOne({ email: data.email }).then((details) => {
      if (details) {
        if (compareSync(data.password, details.password)) {
          const token = jwtGenerator({
            uid: details._id,
            type: details.type,
            first_name: details.first_name,
          });
          resolve({
            token,
            type: details.type,
            first_name: details.first_name,
          });
        } else {
          reject({
            statusCode: 401,
            statusMessage: "Invalid Username Or Password",
          });
        }
      } else {
        reject({
          statusCode: 401,
          statusMessage:
            "Account Not Found. If you are new Kindly Signup and try again.",
        });
      }
    });
  });
