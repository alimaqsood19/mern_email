const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id //grabs the token ID from Axios POST request, token that gets passed when hitting the pay button in stripe plugin
    });
    req.user.credits += 5; //user object req.user has all the fields attached to it as properties including credits
    const user = await req.user.save(); //saves the updated user object with new field credits and its value
    res.send(user); //sends the user back
  });
};
