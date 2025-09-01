import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
export const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not present");
        }
        const payload = jwt.verify(token, process.env.JWT_KEY || '');
        // @ts-ignore
        const { _id, role } = payload;
        if (!_id) {
            throw new Error("invalid Token!");
        }
        const user = await userModel.findById(_id);
        if (!user) {
            throw new Error("User Does not Exist!");
        }
        req.user = user;
        req.userId = _id;
        req.userRole = role;
        next();
    }
    catch (e) {
        console.log("Error", e);
        res.status(404).json({
            success: false,
            message: e.message || "Something went wrong",
        });
    }
};
//# sourceMappingURL=userMiddleware.js.map