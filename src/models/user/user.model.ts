import { prop, getModelForClass } from "@typegoose/typegoose";
import { validateUserEmail } from "./user.validation";
import { Service } from "typedi";
import verifyPassword from "./methods/verify-password";

export class User {
  _id: string;

  @prop()
  username: string;

  @prop({
    validate: {
      validator: validateUserEmail,
      message: "Invalid Email Provided",
    },
  })
  email: string;

  @prop()
  password: string;

  @prop()
  salt: string;

  @prop()
  phoneNumber: string;

  @prop()
  whatsappNumber: string;

  public static async verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string
  ) {
    return verifyPassword(password, hashedPassword, salt);
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

@Service()
export class UserModelRepo {
  getUserModel() {
    return getModelForClass(User);
  }
}
