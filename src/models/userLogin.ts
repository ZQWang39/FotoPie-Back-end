import mongoose, { Document } from "mongoose";
import { IUser } from "./user";

export interface ILoginSession extends Document {
  user: IUser["_id"];
  userEmail: IUser["email"];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const loginSession = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userEmail: { type: String, select: true },

    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const loginSessionModel = mongoose.model<ILoginSession>(
  "Session",
  loginSession
);

export default loginSessionModel;
