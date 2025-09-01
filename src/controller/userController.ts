import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { email, z } from "zod";

const RegisterSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    emailId: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginSchema = z.object({
    emailId: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const UpdateSchema = z.object({
    userName: z.string().min(1, "Username is required"),
});

const UpdatePasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    originalPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

const DeleteUserSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const register = async (req: any, res: any) => {
    try {
        const { userName, emailId, password } = RegisterSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await userModel.findOne({ emailId: emailId });

        if (userExists) {
            return res.status(403).json({
                success: false,
                message: "User Already Exist, Try Login!",
            })
        }

        const user = await userModel.create({
            userName: userName,
            emailId: emailId,
            password: hashedPassword
        })

        const token = jwt.sign(
            { _id: user._id, emailId: user.emailId },
            process.env.JWT_KEY || '',
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only secure on prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "User Registered Successfully!",
        })

    } catch (e: any) {
        console.log(e);
        res.status(403).json({
            success: false,
            message: e.message || "SomeThing went wrong"
        })
    }
}
export const login = async (req: any, res: any) => {
    try {
        const { emailId, password } = LoginSchema.parse(req.body);

        const user = await userModel.findOne({ emailId: emailId });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User Not Exist, Try SignIn!",
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(403).json({
                success: false,
                message: "InValid Password!",
            })
        }

        const token = jwt.sign(
            { _id: user._id, emailId: emailId },
            process.env.JWT_KEY || '',
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only secure on prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "User Loggined Successfully!",
        })

    } catch (e: any) {
        console.log(e);
        res.status(403).json({
            success: false,
            message: e.message || "SomeThing went wrong"
        })
    }
}
export const logout = async (req: any, res: any) => {
    try {
        const { token } = req.cookies;
        const payload = jwt.decode(token);

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully",
        });
    } catch (e: any) {
        console.log("Error", e);
        res.status(404).json({
            success: false,
            message: e.message || "SomeThing went wrong",
        });
    }
}

export const updateUser = async (req: any, res: any) => {
    try {
        const { userName } = UpdateSchema.parse(req.body);

        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = req.user;
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, originalPassword } = req.body;

        const updateFields: Partial<{ userName: string; password: string }> = {
            userName
        };

        if (password && originalPassword) {
            UpdatePasswordSchema.parse({ password, originalPassword });

            const isPasswordCorrect = await bcrypt.compare(originalPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(403).json({ success: false, message: "Original password is incorrect" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        await userModel.findByIdAndUpdate(userId, updateFields);

        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
        });

    } catch (e: any) {
        console.error("Update User Error:", e);

        if (e instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: e
            });
        }

        return res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error",
        });
    }
};

export const deleteUser = async (req: any, res: any) => {
    try {
        const userId = req.userId;
        const { password } = DeleteUserSchema.parse(req.body);

        const user = req.user;

        // @ts-ignore
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ success: false, message: "Password is incorrect" });
        } else {
            const deleteUser = await userModel.deleteOne({ _id: userId });
        }

        return res.status(200).json({
            success: true,
            message: "User Deleted successfully",
        });
    } catch (e: any) {
        console.log("Error", e);
        res.status(404).json({
            success: false,
            message: e.message || "SomeThing went wrong",
        });
    }
}

export const getUser = async (req: any, res: any) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            user: {
                _id: user._id,
                userName: user.userName,
                emailId: user.emailId
            }
        })
    } catch (e: any) {
        console.log("Error", e);
        res.status(404).json({
            success: false,
            message: e.message || "SomeThing went wrong",
        });
    }
}