import passport from "passport";
import * as passportLocal from "passport-local";
import verifyLocal from "./verify-funcion/verify.local";

const LocalStrategy = passportLocal.Strategy;
// var LocalStrategy = require('passport-local');

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    verifyLocal
  )
);
