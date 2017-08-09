const passport = require('passport'); //How to handle authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Using the google oauth strategy
const keys = require('../config/keys.js');

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
