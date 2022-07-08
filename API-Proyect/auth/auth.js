//Importing dependency
const passport = require("passport");
const UserModel = require("../models/user");
const UserId = require("../routers/auth")
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

//Start collecting data to do the function to create the token
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromAuthHeaderAsBearerToken(),
      ]),
    },
    async (token, done) => {
      try {
        const user = await UserModel.findOne(
          { _id: token.user._id},
          "-password"
        );
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);