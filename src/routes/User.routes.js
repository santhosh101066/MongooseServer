import { Router } from "express";
import UserAuthMiddleware from "../middleware/UserAuth.middleware.js";
import CartTotalController from "../controller/CartTotal.controller.js";
import CartModel from "../model/Cart.model.js";

const router = Router();
export default router
  .get("/cartcount", UserAuthMiddleware, CartTotalController)
  .post("/addtocart", UserAuthMiddleware, (req, res) => {
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
  })
  .delete("/cart/:id", UserAuthMiddleware, (req, res) => {
    CartModel.deleteOne({ user_id: res.locals.auth.uid, p_id: req.params.id })
      .then(() => {
        res.json({ message: "Sucessfully removed from cart" });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  }).get('/cart/:id',UserAuthMiddleware,(req,res)=>{
    CartModel.findOne({ user_id: res.locals.auth.uid, p_id: req.params.id },{id:'$_id',p_id:1,quantity:1}).then((data)=>{
        console.log(data);
        res.json(data);
    }).catch(err=>{
        res.statusCode=500
        res.send(err)
    })
  }).put('/cart/:id',UserAuthMiddleware,(req,res)=>{
    console.log(req.body);
    const {type}=req.body
    if(type==="INC"){
        CartModel.find({})
    }
    res.send()
  })
