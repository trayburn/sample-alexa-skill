const alexa = require('alexa-app');
const podcast = require('./podcast');
const app = new alexa.app("podcast");

// const url = "http://thetrinitymission.org/feed/dailyoffice/";
const url = "http://www.pwop.com/feed.aspx?show=dotnetrocks&filetype=master";

const sayings = {
  welcome: "Welcome to the Podcast Sample by Tim Rayburn.  ",
  prompt: "Would you like to play the latest episode or cancel?",
  pause: "Pausing your podcast.",
  utterances: {
    PlayIntent: [
      'play the latest episode',
      'play episode',
      'play latest',
      'play'
    ]
  }
}

app.launch((req, res) => {
  res.say(sayings.welcome + sayings.prompt);
  res.shouldEndSession(false, sayings.prompt)
});

app.intent("AMAZON.HelpIntent", (req, res) => {
  res.say(sayings.prompt);
  res.shouldEndSession(false, sayings.prompt);
});

function pauseIntent(req, res) {
  res.say(sayings.pause);
  res.response.response.directives.push({
    "type": "AudioPlayer.Stop"
  });
}

function resumeIntent(req, res) {
  res.say("This is not yet implemented");
  // Resume requires state, which means a database.
  // PauseIntent will send you the token and offset
  // but you will need to lookup url from token
  // and then compose a response roughly as follows:

  // res.response.response.directives.push({
  //   type: 'AudioPlayer.Play',
  //   playBehavior: 'REPLACE_ALL',
  //   audioItem: {
  //     stream: {
  //       url: 'url-goes-here',
  //       token: 'token-goes-here',
  //       offsetInMilliseconds: 'offset-goes-here'
  //     }
  //   }
  // });
}

app.intent('AMAZON.PauseIntent', pauseIntent);
app.intent('AMAZON.CancelIntent', pauseIntent);
app.intent('AMAZON.StopIntent', pauseIntent);
app.intent('AMAZON.ResumeIntent', resumeIntent);

app.intent('PlayIntent', {
  utterances: sayings.utterances.PlayIntent
}, (req, res) => {
  podcast.getLatestEpisode(url, (err, data) => {
    if (err) {
      res.fail(err);
    }

    res.response.response.directives.push({
      type: 'AudioPlayer.Play',
      playBehavior: 'REPLACE_ALL',
      audioItem: {
        stream: {
          url: data.url,
          token: data.token,
          offsetInMilliseconds: 0
        }
      }
    });
    
    res.send();
  });

  // return false to not automatically reply
  return false;
});


module.exports = app;