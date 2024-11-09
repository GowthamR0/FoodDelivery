import jwtPassport from 'passport-jwt';

import {UserModel} from '../database/user'

const jwtStrategy = jwtPassport.Strategy;
const extractJwt = jwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp"
};

export default (passport) => {
    passport.use(
        new jwtStrategy(options, async(jwt__payload, done) => {
            try {
                const doesUserExist = UserModel.findById(jwt__payload.user);

                if(!doesUserExist) return done(null, false);

                return done(null, doesUserExist);
            }catch(error) {
                throw new Error(error);
            }
        })
    );
};