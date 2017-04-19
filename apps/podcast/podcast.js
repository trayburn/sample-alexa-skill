const request = require('request-promise-native');
const xml2js = require('xml2js');
const md5 = require('md5');

function getLatestEpisode(url, cb) {
    request(url)
    .then(xml => {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    })
    .then(data => {
        var item = data.rss.channel[0].item[0];
        return {
          name: item.title[0],
          link: item.link[0],
          // All URLs used by Alexa Skills must be HTTPS
          url: item.enclosure[0]['$'].url.replace("http://","https://"),
          type: item.enclosure[0]['$'].type,
          token: md5(item.link[0])
        };
    })
    .then(result => {
        cb(null, result);
    })
    .catch(err => {
        cb(err, null);
    });
}

module.exports = {
    getLatestEpisode: getLatestEpisode
}