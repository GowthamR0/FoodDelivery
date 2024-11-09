import googleOAuth from 'passport-google-oauth20';

import { UserModel } from '../database/allModels';

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID:"423986984130-i2q2tcaabop5jqc7a75ilrj0kotp5ad0.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL:"https://food-delivery-sand.vercel.app/auth/google/callback"
    },
    async(accessToken,refreshToken,profile,done) => {
      //creating a new user
      const newUser = {
        fullName:profile.displayName,
        email:profile.emails[0].value,
        profilePic:profile.photos[0].value
      };
      try {
        //check whether user already exists or not
        const user = await UserModel.findOne({email:newUser.email});

        if(user) {
          const token = user.generateJwtToken();

          done(null, {user, token});
        } else {
          //create a new user
          const user = await UserModel.create(newUser);
          const token = user.generateJwtToken();

          done(null, {user, token});
        }
      }catch(err) {
        done(err, null);
      }
    }
    )
  );

  passport.serializeUser((userData,done) => done(null,{...userData}));
  passport.deserializeUser((id, done) => done(null,id));
}  