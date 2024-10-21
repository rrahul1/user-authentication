import express from "express";
import {
   signup,
   login,
   getAllUserDetails,
   updateUser,
   deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-user/:userId", updateUser);
router.delete("/delete-user/:id", deleteUser);
router.get("/get-user", getAllUserDetails);

export default router;
