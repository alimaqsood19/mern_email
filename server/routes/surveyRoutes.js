const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js'); //middleware to check if logged in
const requireCredits = require('../middlewares/requireCredits.js'); //middleware to check for enough credits
const Mailer = require('../services/mailer.js'); //required mailer class from services folder to process our email and send to SG API
const surveyTemplate = require('../services/emailTemplates/surveyTemplates.js'); //template for what our email will look like

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body; //pulling off info from the request body

    const survey = new Survey({
      //creating new Survey model with sub-doc recipients model
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => {
        //.map creates a new array with modified array elements
        return { email: email.trim() }; //returning an object that says email: emailOfUser, returns array of objects
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //mailer object defined by the Mailer class
    const mailer = new Mailer(survey, surveyTemplate(survey)); //first argument contains the subject and recipients to be sent
    //second argument the actual body or content of the mail itself (survey.body)
    mailer.send(); //Finally sending processed email
  });
};
