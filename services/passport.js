const passport = require('passport'); //How to handle authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Using the google oauth strategy
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

//model class/Schema User
const User = mongoose.model('users'); //single argument, so we are fetching the users schema from mongoose, two arguments adding something to mongoose

passport.serializeUser((user, done) => {
  //serializeUser creates a unique identifying piece of info from the user instance, that then passport stuffs into a cookie
  done(null, user.id); //*** Do not need to reference _id.$oid, shortcut to reference that by using user.id
});

passport.deserializeUser((id, done) => {
  //this ID isnt profile id (googleId), its the mongo user ID passed from passport which got it from cookieSession -> req.session
  //deserializerUser takes the id and transform back into user instance
  User.findById(id).then(user => {
    //based on that id find that user and then pass it to done()
    done(null, user);
  });
});

//Informing passport library on which strategy we are using to authenticate
passport.use(
  //Strategy by default is known as 'google', internal identifier
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', //user comes back from google after granting permission for our app to acess details,
      proxy: true //tells google to trust the heroku proxy and allow it to be https (secured)
    }, //and hits this endpoint in order for us to pull off the specific code to grab the info of the user from google
    (accessToken, refreshToken, profile, done) => {
      //Callback fn automatically called when user redirected to our site from google
      //allows us to create a new user in our database, accessToken allows us to access users email etc
      //refreshToken automatically updates the accessToken as it does expire
      //profile has all the identifying information of the user, it has that unique google id that we will add to our db
      User.findOne({ googleId: profile.id }) //making sure user doesnt already exist in DB
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser); //done() tells passport that we are done authenticating, first argument is for errors
          } else {
            new User({
              //Saves user to DB using google ID thats provided by the callback
              googleId: profile.id
            })
              .save()
              .then(user => {
                done(null, user);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
); //Creating new instance of google passport auth strategy
