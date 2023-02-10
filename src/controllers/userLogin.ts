import { NextFunction, Request, Response } from "express";
import { getCombinedNodeFlags } from "typescript";
import User, { IUser } from "../models/user";
import loginSessionModel from "../models/userLogin";
import { signJwt } from "../utilities/jwtUtils";

// user login action
const userLoginCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check password
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return res.status(404).json({ error: "Email not exist or wrong password" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res
      .status(404)
      .json({ message: "Email not exist or wrong password" });
  }

  const findUser = user.toJSON();

  //create a login session
  const loginSession = (
    await loginSessionModel.create({ userID: findUser._id })
  ).toJSON();
  //create an access token
  const accessToken = signJwt(
    { ...findUser, session: loginSession.userID },
    { expiresIn: "30m" }
  );
  //create a refresh token
  const refreshToken = signJwt(
    { ...findUser, session: loginSession.userID },
    { expiresIn: "1y" }
  );
  return res.status(200).send({ accessToken, refreshToken });
};

//find the login session based on the accessToken stored in the header
const findUserLogin = async (req: Request, res: Response) => {
  const userID = res.locals.user._id;
  const loginSession = await loginSessionModel.find({
    userID: userID,
    valid: true,
  });
  console.log(loginSession);
  return res.send(loginSession);
};

export default { userLoginCreate, findUserLogin };
