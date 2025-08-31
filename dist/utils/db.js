import mongoose, { connect } from "mongoose";
const connectDataBase = async () => {
    try {
        await connect(process.env.DATABASE_URL || "", {
            serverSelectionTimeoutMS: 5000, // fail fast if unreachable
        });
        console.log("✅ MongoDB connected");
    }
    catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    }
};
export default connectDataBase;
//# sourceMappingURL=db.js.map