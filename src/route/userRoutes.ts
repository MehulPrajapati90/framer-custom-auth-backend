import { Router } from "express";
import { register, login, logout, updateUser, deleteUser, getUser } from "../controller/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { createAdmin, getAllUsers } from "../controller/adminController.js";

const userRouter = Router();

// user Routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', userMiddleware, logout);
userRouter.put('/update', userMiddleware, updateUser);
userRouter.delete('/delete', userMiddleware, deleteUser);
userRouter.get('/me', userMiddleware, getUser);

// Admin Routes
userRouter.post("/create-admin", userMiddleware, adminMiddleware, createAdmin);
userRouter.get('/all', userMiddleware, adminMiddleware, getAllUsers);

export default userRouter;