export const adminMiddleware = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied: Admins Only",
        });
    }
    next();
};
//# sourceMappingURL=adminMiddleware.js.map