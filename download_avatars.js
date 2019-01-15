var request = require('request');
var fs = require('fs');
require('dotenv').config();

const access_token = process.env.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    qs: {
      access_token: process.env.GITHUB_TOKEN
    },
    headers: {
      'User-Agent': 'request',
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
    throw err;
  })
    .on('response', function (response) {
    console.log('Downloading...')
  })
  .on('end', function (response) {
    console.log('Download complete!');
  })
  .pipe(fs.createWriteStream(filePath));
};

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors("jquery", "jquery", function(err, collaborators) {
  if (err) {
    return console.log("Errors:", err);
  }
  collaborators.forEach(function(collaborator) {
    console.log(collaborator.avatar_url);
  });
  // console.log("Result:", result);
});