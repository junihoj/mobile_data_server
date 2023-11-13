import { Service } from "typedi";

@Service()
export default class AuthService {
  async loginUser() {
    console.log("THIS IS AUTH SERVICE LOGIN USER");
  }
}
