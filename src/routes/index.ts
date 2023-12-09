import { Router } from "express-serve-static-core";
import Container, { Service } from "typedi";
import AuthRoute from "./auth-route";

@Service()
export class RouteProvider {
  authRoutes = Container.get(AuthRoute).init();

  routesFunc(app: { use: (path: string, expressRouter: Router) => void }) {
    app.use("/api/auth", this.authRoutes);
  }
}

export default RouteProvider;
