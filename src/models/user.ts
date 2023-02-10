import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: string;
  passwordChangeAt: Date;
  PasswordResetToken: string;
  active: boolean;
  createAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const User: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    valid: { type: Boolean, default: true },
    username: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordChangeAt: Date,
    PasswordResetToken: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createAt: Date,
  },
  { collection: "user-data-4", versionKey: false, timestamps: true }
);

User.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const userModel = mongoose.model<IUser>("UserData", User);
export default userModel;
