import { IVerifyOptions, VerifyFunction } from "passport-local";
import UserModel, { User } from "../../..//models/user/user.model";

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Express {
//     interface User {
//       _id?: string;
//       email: string;
//     }
//   }
// }

const verifyLocal: VerifyFunction = async (
  email: string,
  password: string,
  done: (
    error: any,
    // user?: false | Express.User | undefined,
    user?: undefined | User | false,
    options?: IVerifyOptions | undefined
  ) => void
) => {
  if (!password || !email)
    return done(
      null,
      undefined,

      {
        message:
          "Input Password and Password or  try logging in with a different method",
      }
    );
  const userExist = await UserModel.findOne({ email: email }).lean();
  if (!userExist) return done(null, false, { message: "User does not exist" });
  if (userExist) {
    const isMatch = await UserModel.verifyPassword(
      password as string,
      userExist.password,
      userExist.salt
    );
    if (!isMatch) done(null, false, { message: "Invalid Password or email" });
    done(null, userExist);
  }
};
export default verifyLocal;
