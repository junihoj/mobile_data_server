import AuthService from "../../services/auth-service/auth.service";
import { Service } from "typedi";
import { Request, Response } from "express";
import { CreateUserInput } from "../../models/user/dto/user.input";
@Service()
export default class AuthController {
  constructor(public authService: AuthService) {}
  async login(req: Request, res: Response) {
    try {
      const input = req.body;
      return this.authService.loginUser(input, req, res);
    } catch (err) {
      console.log("ERROR OCCURED", err);
    }
  }
  async register(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
      const inputData = req.body;
      const data = await this.authService.register(inputData);
      if (data) {
        res.json({
          message: "ok",
        });
      }
    } catch (err) {
      console.log("error", err);
      res.status(500).json({
        error: "An Error Occur processing request",
      });
    }
  }
}
