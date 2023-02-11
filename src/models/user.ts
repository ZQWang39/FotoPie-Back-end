import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  username: string;
  role: string;
  active: boolean;
  correctPassword(candidatePassword: string, userPassword: string): boolean;
}

const User: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    username: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordChangeAt: Date,
    PasswordResetToken: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { collection: "user-data-2", versionKey: false }
);

export default mongoose.model<IUser>("UserData", User);
