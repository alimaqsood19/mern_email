const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google', //second argument is passport.authenticate basically initites passport to run the oAuth flow
    passport.authenticate('google', {
      //strategy called 'google', we never specified the strategy specifically as google, internally google strategy is reference as 'google' so whenever we specify the strategy 'google' passport knows to go find the google oauth flow wired up in passport.js
      //passport authenticate user hiting this endpoint, using the strategy called google
      scope: ['profile', 'email'] //scope specifies to google servers what access we want to have to the users profile, so we want their profile info and email
    })
  );

  //callback after user grants permission, passport exchanges code with user info
  app.get('/auth/google/callback', passport.authenticate('google')); //google strategy grabs the code exchanges the code for the users profile info

  app.get('/api/logout', (req, res) => {
    req.logout(); //passport adds the logout method to the req object, logs out that user kills the cookie
    res.send('Logged out');
  });

  //User that went through OAuth flow
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
