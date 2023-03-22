import { Router } from "express";
import AdminAuthMiddleware from "../middleware/AdminAuth.middleware.js";
import BasicProductViewController from "../controller/BasicProductView.controller.js";
import DetailedProductViewController from "../controller/DetailedProductView.controller.js";

const router = Router();

export default router
  .get("/basic/:category", BasicProductViewController)
  .get("/detailed/:id", DetailedProductViewController)
  .put("/", AdminAuthMiddleware);
