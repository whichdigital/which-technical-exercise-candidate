#!/usr/bin/env bash

const https = require('https');
const fs = require('fs');

const candidateSubmission = process.argv[2];
const submissionContents = fs.readFileSync(candidateSubmission);

console.log('Uploading your submission to Which? systems ...');

const request = https.request(
  {
    host: 'api.interviews.internal.which.co.uk',
    path: '/submission',
    method: 'POST',
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `inline; filename="${encodeURIComponent(candidateSubmission)}"`,
      'Content-Length': submissionContents.length,
    },
  },
  (response) => {
    if (response.statusCode !== 200) {
      console.error(
        'The server reported a problem receiving your submission. Try again. If it continues please contact Which? via email.',
        response.statusCode
      );
      response.resume();
      return;
    }

    response.on('close', () => {
      console.log('The server abruptly closed the connection.');
    });
  }
);
request.write(submissionContents);
request.end();

request.on('error', (error) => {
  console.error(
    'There was a problem uploading your submission. Try again. If it continues please contact Which? via email.',
    error.message
  );
});

console.log("Submission upload complete. Please let Which? know you've done this just in case!");
