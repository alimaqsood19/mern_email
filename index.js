const express = require('express');
require('./services/passport.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

authRoutes(app); //passing in the express app object to allow the authRoutes endpoints to be included

app.listen(PORT, () => {
  console.log('Sever up on port 3000');
});
