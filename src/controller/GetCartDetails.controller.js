import CartModel from "../model/Cart.model.js";

export default (req, res) => {
  CartModel.findOne(
    { user_id: res.locals.auth.uid, p_id: req.params.id },
    { id: { $toString: "$_id" }, p_id: 1, quantity: 1, _id: 0 }
  )
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
};
