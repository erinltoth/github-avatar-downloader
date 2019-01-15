var request = require('request');
var fs = require('fs');
require('dotenv').config();
var myArgs = process.argv.slice(2);

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
    // console.log('Downloading...')
  })
  .on('end', function (response) {
    console.log('Downloading...');
  })
  .pipe(fs.createWriteStream(filePath)
    )
  .on('finish', function (response) {
    console.log('Download complete!');
  })

};

getRepoContributors(myArgs[0], myArgs[1], function(err, collaborators) {
  if (err) {
    return console.log("Errors:", err);
  }
  collaborators.forEach(function(collaborator) {
    var url = collaborator.avatar_url;
    var filePath = "avatars/" + collaborator.login + ".jpg";
    downloadImageByURL(url, filePath);

  });
});