import { Router } from "express";
import { register, login, logout, updateUser, deleteUser, getUser } from "../controller/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', userMiddleware, logout);
userRouter.put('/update', userMiddleware, updateUser);
userRouter.delete('/delete', userMiddleware, deleteUser);
userRouter.get('/me', userMiddleware, getUser);

export default userRouter;