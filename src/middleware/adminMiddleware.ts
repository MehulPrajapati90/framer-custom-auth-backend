export const adminMiddleware = (req: any, res: any, next: any) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied: Admins Only",
        });
    }
    next();
};
