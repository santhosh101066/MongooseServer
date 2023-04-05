import CartModel from "../model/Cart.model.js";

export default (req, res) => {
    const data = req.body;
    CartModel.create({
      p_id: data.p_id,
      user_id: res.locals.auth.uid,
      quantity: data.quantity,
    })
      .then(() => {
        res.statusCode = 201;
        res.json({ message: "Added to cart" });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.send(err);
      });
  }