import mongoose from "mongoose";
declare const userModel: mongoose.Model<{
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userName: string;
    emailId: string;
    role: "user" | "admin";
    disable: boolean;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map