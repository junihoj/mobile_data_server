import express from "express";
import "dotenv/config";
import http from "node:http";
import "reflect-metadata";

async function Init() {
  const app = express();
  const httpServer = http.createServer(app);

  httpServer.listen(5000, () => {
    "Connected Successfully";
  });
}

Init();
