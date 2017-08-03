const express = require('express');
const passport = require('passport'); //How to handle authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Using the google oauth strategy
const keys = require('./config/keys.js');
const app = express();
const PORT = process.env.PORT || 3000;

//Informing passport library on which strategy we are using to authenticate
passport.use(
  //Strategy by default is known as 'google', internal identifier
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' //user comes back from google after granting permission for our app to acess details,
    }, //and hits this endpoint in order for us to pull off the specific code to grab the info of the user from google
    (accessToken, refreshToken, profile, done) => {
      //allows us to create a new user in our database, accessToken allows us to access users email etc
      //refreshToken automatically updates the accessToken as it does expire
      //profile has all the identifying information of the user
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log(('profile', profile));
    }
  )
); //Creating new instance of google passport auth strategy

app.get(
  '/auth/google',
  passport.authenticate('google', {
    //passport authenticate user hiting this endpoint, using the strategy called google
    scope: ['profile', 'email'] //scope specifies to google servers what access we want to have to the users profile, so we want their profile info and email
  })
);

//callback after user grants permission, passport exchanges code with user info
app.get('/auth/google/callback', passport.authenticate('google')); //google strategy grabs the code exchanges the code for the users profile info

app.listen(PORT, () => {
  console.log('Sever up on port 3000');
});
