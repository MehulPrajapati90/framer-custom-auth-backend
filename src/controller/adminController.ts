import { z } from "zod";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const RegisterSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    emailId: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});


export const createAdmin = async (req: any, res: any) => {
    try {
        const { userName, emailId, password } = RegisterSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await userModel.findOne({ emailId: emailId });
        if (userExists) {
            return res.status(403).json({
                success: false,
                message: "Admin Already Exist, Try Login!",
            });
        }

        const admin = await userModel.create({
            userName,
            emailId,
            password: hashedPassword,
            role: "admin" 
        });

        res.status(200).json({
            success: true,
            message: "Admin Created Successfully!"
        });
    } catch (e: any) {
        console.error("Create Admin Error:", e);
        res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
};


export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await userModel.find({
            disable: false
        }).select('-password -disable');
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            user: users
        });
    } catch (e: any) {
        res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
};
