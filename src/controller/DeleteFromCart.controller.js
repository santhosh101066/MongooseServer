import CartModel from "../model/Cart.model.js";

export default (req, res) => {
    CartModel.deleteOne({ user_id: res.locals.auth.uid, p_id: req.params.id })
      .then(() => {
        res.json({ message: "Sucessfully removed from cart" });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  }