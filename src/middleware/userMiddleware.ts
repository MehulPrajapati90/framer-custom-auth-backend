import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const userMiddleware = async(req:any, res: any, next: any)=>{
    try {
    const {token} = req.cookies;

    if(!token){
        throw new Error("Token is not present");
    }

    const payload = jwt.verify(token, process.env.JWT_KEY || '');

    // @ts-ignore
    const {_id} = payload;

    if(!_id){
        throw new Error("invalid Token!");
    }

    // @ts-ignore
    const user = await userModel.findById(_id);

    if(!user){
        throw new Error("User Does not Exist!");
    }

    req.user = user;
    req.userId = _id;

    next();
  } catch (e: any) {
    console.log("Error", e);
    res.status(404).json({
      success: false,
      message: e.message || "Something went wrong",
    });
  }
}