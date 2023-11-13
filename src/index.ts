import express from "express";
import "dotenv/config";
import http from "node:http";
import "reflect-metadata";
import db from "./config/db";
import RouteProvider from "./routes/index";

async function Init() {
  const app = express();
  const routerProvider = new RouteProvider();
  db();
  const httpServer = http.createServer(app);
  const port = process.env.PORT ?? 5000;

  routerProvider.routesFunc(app);

  httpServer.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

Init();
