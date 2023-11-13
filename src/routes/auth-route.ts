import { Service } from "typedi";
import AuthController from "../controllers/auth-controller";
import { Router } from "express";

@Service()
export default class AuthRoute {
  authRouter: Router;
  // authController:AuthController
  constructor(public authController: AuthController) {
    this.authRouter = Router();
  }

  init() {
    this.authRouter.get("/this", this.authController.login);
    return this.authRouter;
  }
}
