import { prop, getModelForClass } from "@typegoose/typegoose";
import { validateUserEmail } from "./user.validation";

export class User {
  @prop()
  username: string;

  @prop({
    validate: {
      validator: validateUserEmail,
      message: "Invalid Email Provided",
    },
  })
  email: string;

  @prop({
    validate: validateUserEmail,
  })
  password: string;

  @prop()
  salt: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
