import LoginService from "../services/Login.service.js";

export default  (req, res) => {
    LoginService(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.statusCode = err.statusCode;
        res.statusMessage = err.statusMessage;
        res.send();
      });
  }