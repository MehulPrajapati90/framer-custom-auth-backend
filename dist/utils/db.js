import mongoose, { connect } from "mongoose";
const connectDataBase = async () => {
    await connect(process.env.DATABASE_URL || "");
    console.log('Connect to DataBase');
};
export default connectDataBase;
//# sourceMappingURL=db.js.map