import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utilities/jwtUtils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");
  console.log("decoded", decoded);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
