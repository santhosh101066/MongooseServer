import { Router } from "express";
import RegisterController from "../controller/Register.controller.js";
import LoginController from "../controller/Login.controller.js";
import ValidateUserController from "../controller/ValidateUser.controller.js";

const router = Router();
router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/validate", ValidateUserController);

const Authentication = router;
export default Authentication;
