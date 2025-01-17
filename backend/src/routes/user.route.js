import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { RegisterUser, LoginUser, userLogout,accesRefreshToken } from "../controllers/user.controler.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "profileImage", maxCount: 1 }
    ]),
    RegisterUser
);

router.route("/login").post(LoginUser);
router.route("/logout").post(jwtVerify, userLogout);
router.route("/token").post(accesRefreshToken)

export default router;
