import jwt from "jsonwebtoken";

export const jwtGenerator = (data) => {
  return jwt.sign(data, process.env.JwtSecretKey, { expiresIn: "1d" });
};

