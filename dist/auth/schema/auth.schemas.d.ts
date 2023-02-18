import mongoose, { HydratedDocument } from "mongoose";
import { role } from "./role.enums";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: role;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
