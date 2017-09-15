const keys = require('../config/keys');

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //Constructor in the extended Mail class will be called through super()

    this.sgApi = sendgrid(keys.sendGridKey); //Communicates with the sendgrid API

    //SendGrid setup
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients); //array of formatted emails

    this.addContent(this.body); //extended Mail class has func addContent(), passing email body to it

    //Click tracking, sendgrind scans email, replaces every link with their own special one
    this.addClickTracking();

    //Addings the formatted recipients
    this.addRecipients();
  }

  addClickTracking() {
    //required for sendgrid to replace links, -> lets us know etc
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  formatAddresses(recipients) {
    //Formats the array of objects passed in as recipients in the constructor
    return recipients.map(({ email }) => {
      return new helper.Email(email); //helper.Email formats the email
    });
  }

  addRecipients() {
    //Requirements by sendGrid need to setup all this
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize); //function in the extended Mail class
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() //Converst all the properties to JSOn data
    });

    const response = this.sgApi.API(request); //This is what sends the email off to sendgrind
    return response;
  }
}

module.exports = Mailer;
