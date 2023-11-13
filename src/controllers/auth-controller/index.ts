import AuthService from "../../services/auth-service/auth.service";
import { Service } from "typedi";
@Service()
export default class AuthController {
  // authService: AuthService;

  constructor(public authService: AuthService) {}
  async login() {
    try {
      this.authService.loginUser();
    } catch (err) {
      console.log("ERROR OCCURED", err);
    }
  }
}
