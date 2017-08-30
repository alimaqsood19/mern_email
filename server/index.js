const express = require('express');
require('./models/user.js'); //Need to import user model schema first otherwise below passport will reference something that hasnt been loaded
require('./services/passport.js'); //Loads the user model schema so need to import the model first (above)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const billingRoutes = require('./routes/billingRoutes.js');
const { mongodbURI } = require('./config/keys');
const { cookieKey } = require('./config/keys.js');
const cookieSession = require('cookie-session'); //Tells express that we are using cookies and gives us access to them
const passport = require('passport'); //Tells passport to make use of cookies

mongoose.connect(mongodbURI);
mongoose.Promise = global.Promise;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//Tells express to use this middleware to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [cookieKey] //array allows us to specify many keys that are chosen at random for extra security
  })
);
//Tells passport to make use of the cookies
app.use(passport.initialize());
app.use(passport.session()); //transform req.user object to contain user information from deserializeUser which gets its info from cookieSession

authRoutes(app); //passing in the express app object to allow the authRoutes endpoints to be included
billingRoutes(app);

app.listen(PORT, () => {
  console.log('Sever up on port 5000');
});
