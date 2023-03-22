import { Router } from "express";
import AdminAuthMiddleware from "../middleware/AdminAuth.middleware.js";
import multer from "multer";
import AddNewProductController from "../controller/AddNewProduct.controller.js";

const router = Router();
const storage = multer({ dest: "./ProductImages/" });
const upload = storage.fields([
  { name: "main_image", maxCount: 1 },
  { name: "other_image" },
]);

export default router
  .all(AdminAuthMiddleware)
  .post("/newproduct", upload, AddNewProductController);
