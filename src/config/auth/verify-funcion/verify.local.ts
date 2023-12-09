import { IVerifyOptions, VerifyFunction } from "passport-local";
import UserModel from "../../..//models/user/user.model";
const verifyLocal: VerifyFunction = async (
  email: string,
  password: string,
  done: (
    error: any,
    user?: false | Express.User | undefined,
    options?: IVerifyOptions | undefined
  ) => void
) => {
  if (!password || !email)
    return done(
      new Error(
        "Input Password and Password or  try logging in with a different method"
      ),
      undefined
    );
  const userExist = await UserModel.findOne({ email: email }).lean();
  if (!userExist) return done("User does not exist", undefined);
  if (userExist) {
    const isMatch = await UserModel.verifyPassword(
      password as string,
      userExist.password,
      userExist.salt
    );
    if (!isMatch) done(new Error("Invalid Password or email"), undefined);
    done(null, userExist);
  }
};
export default verifyLocal;
