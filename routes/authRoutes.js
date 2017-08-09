const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      //passport authenticate user hiting this endpoint, using the strategy called google
      scope: ['profile', 'email'] //scope specifies to google servers what access we want to have to the users profile, so we want their profile info and email
    })
  );

  //callback after user grants permission, passport exchanges code with user info
  app.get('/auth/google/callback', passport.authenticate('google')); //google strategy grabs the code exchanges the code for the users profile info
};
