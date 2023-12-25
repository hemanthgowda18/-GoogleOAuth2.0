const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport=require("passport")
const User=require("./models/User")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
     const existingUser=await User.findOne({googleId:profile.id})
     if(existingUser){
      return cb(null,existingUser)
     }
     const newUser=await User.create({
      googleId:profile.id,
      name:profile.displayName
     })
     cb(null,newUser)
    
    }
  )
);
passport.serializeUser(function(user,done){
  return done(null,user.googleId)
})
passport.deserializeUser(async function(id,done){
  const user=await User.findOne({googleId:id})
  done(null,user)
})
