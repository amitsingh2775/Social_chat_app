import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { RegisterUser } from "../controllers/user.controler.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage", maxCount: 1
        }
    ]),
    RegisterUser
);

export default router;
