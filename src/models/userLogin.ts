import mongoose, { Document } from "mongoose";
import { IUser } from "./user";

export interface ILoginSession extends Document {
  userEmail: IUser["email"];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const loginSession = new mongoose.Schema(
  {
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
