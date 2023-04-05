import { Router } from "express";
import UserAuthMiddleware from "../middleware/UserAuth.middleware.js";
import CartTotalController from "../controller/CartTotal.controller.js";
import AddtoCartController from "../controller/AddtoCart.controller.js";
import DeleteFromCartController from "../controller/DeleteFromCart.controller.js";
import GetCartDetailsController from "../controller/GetCartDetails.controller.js";
import UpdateCartQuantityController from "../controller/UpdateCartQuantity.controller.js";
import CartModel from "../model/Cart.model.js";

const router = Router();
export default router
  .get("/cartcount", UserAuthMiddleware, CartTotalController)
  .post("/addtocart", UserAuthMiddleware, AddtoCartController)
  .get("/cart/:id", UserAuthMiddleware, GetCartDetailsController)
  .put("/cart/:id", UserAuthMiddleware, UpdateCartQuantityController)
  .delete("/cart/:id", UserAuthMiddleware, DeleteFromCartController)
  .get("/cart", UserAuthMiddleware, (req, res) => {
    CartModel.aggregate([
      { $match: { user_id: res.locals.auth.uid } },
      {$addFields:{pid:{$toObjectId:"p_id"}}},
      { $lookup: {from:'products',as:"products",localField:''} },
    ]);
    CartModel.find({ user_id: res.locals.auth.uid })
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
