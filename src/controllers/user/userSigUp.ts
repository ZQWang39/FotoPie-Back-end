import express, { Request, Response } from "express";
import userModel from "../../models/user";

const bcrypt = require("bcryptjs");

//sign up a new user
const userSignup = async (req: Request, res: Response) => {
  const { username, email, password, confirm_password } = req.body;

  //check email unique
  //return 500
  //JWT
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    // await new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: newPassword,
    //   confirm_password: newConfirmPassword,
    // }).save();

    await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: "Error" });
  }
};

export default userSignup;
