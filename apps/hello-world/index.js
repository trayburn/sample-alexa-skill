const alexa = require('alexa-app');
const app = new alexa.app("sample");

app.intent("HelloWorldIntent", {
    "slots": { "name": "AMAZON.US_FIRST_NAME" },
    "utterances": ["say hello to {-|name}"]
  },
  function(request, response) {
    var name = request.slot("name");
    response.say("Hello " + name);
  }
);

module.exports = app;