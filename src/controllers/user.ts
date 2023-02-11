import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";

// admin login action
const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = await req.body;
  try {
    const adminUser = await User.findOne<IUser>({ email: email }).select(
      "+password"
    );
    if (!adminUser) {
      return res
        .status(404)
        .json({ error: "Email not exist or wrong password" });
    }
    const isPasswordValid = adminUser.correctPassword(
      password,
      adminUser.password
    );
    if (isPasswordValid) {
      return res.status(200).json({ adminUser });
    } else {
      return res
        .status(404)
        .json({ message: "Email not exist or wrong password" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//get all users
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  console.log("Getting users");
  try {
    User.find().then((users) => res.status(200).json({ users }));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { adminLogin, getUsers };
