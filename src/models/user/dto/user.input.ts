export class CreateUserInput {
  email: string;
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
  whatsappNumber: string;
  salt?: string;
}

export class LoginUserInput {
  email?: string;
  username?: string;
  password: string;
}
