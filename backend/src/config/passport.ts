import passport from "passport";
import { Strategy as GoogleStrategy, type StrategyOptions } from "passport-google-oauth20";
import { config } from "dotenv";
config()
const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

interface UserData {
    googleId:string|undefined;
    name:string|undefined;
    email:string|undefined;
    avatar:string|undefined;
}


passport.use(new GoogleStrategy({
    clientID:clientId as string,
    clientSecret:clientSecret as string,
    callbackURL: "/auth/google/callback",
},
async (accessToken:string,refreshToken:string,profile,done)=>{

    try {
        const userData:UserData = profile as unknown as UserData;
        return done(null,userData) 
    } catch (error) {
        return done(error,false);
    }

}
))



export default passport;
