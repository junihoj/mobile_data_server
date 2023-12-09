import crypto from "node:crypto";
import {
  CreateUserInput,
  LoginUserInput,
} from "../../models/user/dto/user.input";
import UserModel from "../../models/user/user.model";
import { Service } from "typedi";
import passport from "passport";
import { Response, Request } from "express";
import { User } from "../../models/user/user.model";
import jwt from "jsonwebtoken";

@Service()
export default class AuthService {
  async loginUser(input: LoginUserInput, req: Request, res: Response) {
    if (!input?.email || input?.username) {
      let InvalidUserError = new Error("Invalid Username or email");
      InvalidUserError.name = "custom";
      throw InvalidUserError;
    }
    passport.authenticate(
      "local",
      { session: false },
      (err: any, user: User, _info: any) => {
        // if (err || !user) {
        //   return res.json("Authentication Failed");
        // }
        if (user) {
          req.logIn(user, { session: false }, (err) => {
            if (err) res.send(err);

            const token = jwt.sign(
              { _id: user._id },
              process.env.JWT_SECRET as string,
              {
                expiresIn: "7d",
              }
            );

            user.password = "";
            return res.json({
              user: User,
              token,
            });
          });
        }

        return res.json("Authentication Failed");

        //generate token
      }
    )(req, res);
  }

  async register(input: CreateUserInput) {
    const salt = crypto.randomBytes(16).toString();

    input.salt = salt;
    const hashPassword = crypto
      .pbkdf2Sync(input.password, salt, 10000, 512, "sha512")
      .toString("hex");
    input.password = hashPassword;

    const newUser = await UserModel.create({ ...input });
    await newUser.save();
    return newUser;
  }
}
