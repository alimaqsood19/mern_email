// keys.js what credentials to use

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod.js');
} else {
  module.exports = require('./dev.js'); //Pulling credentials from dev.js and exporting to whatever needs it
}
