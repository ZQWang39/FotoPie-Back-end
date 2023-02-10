import { NextFunction, Request, Response } from "express";
import loginSessionModel from "../models/userLogin";
import { verifyJwt } from "../utilities/jwtUtils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessHeader = req.headers["authorization"];
  const accessToken = accessHeader && accessHeader.split(" ")[1];

  const refreshToken = req.headers["x-refresh"];

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  console.log("decoded", decoded);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const { decoded } = verifyJwt(refreshToken as string);

    if (!decoded) {
      return res.json({ message: "Please sign in again" });
    }

    //const session = await loginSessionModel.find({userEmail:decoded })
  }
  return next();
};

export default deserializeUser;
