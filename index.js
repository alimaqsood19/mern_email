const express = require('express');
const passport = require('passport'); //How to handle authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Using the google oauth strategy
const app = express();
const PORT = process.env.PORT || 3000;

//Informing passport library on which strategy we are using to authenticate
passport.use(new GoogleStrategy()); //Creating new instance of google passport auth strategy

app.listen(PORT, () => {
  console.log('Sever up on port 3000');
});
