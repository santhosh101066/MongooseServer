import jwt from "jsonwebtoken";

export default (req, res) => {
  const authHead = req.headers.authorization;
  const token = authHead && authHead.split(" ")[1];
  jwt.verify(token, process.env.JwtSecretKey, (err, sucess) => {
    if (err === jwt.TokenExpiredError) {
      res.statusCode = 401;
      res.statusMessage = "Your Session have been Expired.";
      return res.send();
    } else if (err) {
      res.statusCode = 401;
      res.statusMessage = "Your account have been Logged out.";
      return res.send();
    } else {
      res.locals.auth = sucess;
      res.json({
        status: "sucess",
        type: res.locals.auth.type,
        first_name: res.locals.auth.first_name,
      });
    }
  });
};
