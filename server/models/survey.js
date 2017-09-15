const mongoose = require('mongoose');
const RecipientSchema = require('./recipient.js');

const surveySchema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  subject: {
    type: String
  },
  recipients: {
    //This field will conform to the RecipientSchema imported from recipient.js
    type: [RecipientSchema]
  },
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId, //Object ID of the specific user who owns this record
    ref: 'User' //Reference we are making to belongs to the User collection
  },
  dateSent: {
    type: Date
  },
  lastResponded: {
    type: Date
  }
});

mongoose.model('surveys', surveySchema);
