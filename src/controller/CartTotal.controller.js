import CartModel from "../model/Cart.model.js";

export default (req, res) => {
  const user_id = res.locals.auth.uid;
  CartModel.find({ user_id })
    .countDocuments()
    .then((length) => {
      res.statusCode = 200;
      res.json({ length });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send(err);
    });
};
