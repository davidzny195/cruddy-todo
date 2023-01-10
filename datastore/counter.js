const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
var Promise = require('bluebird');

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = () => {
  // fs.readFile(exports.counterFile, (err, fileData) => {
  //   if (err) {
  //     callback(null, 0);
  //   } else {
  //     callback(null, Number(fileData));
  //   }
  // });
  return new Promise((resolve, reject) => {
    fs.readFile(exports.counterFile, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        resolve(Number(fileData));
      }
    });
  });
};

const writeCounter = (count) => {
  var counterString = zeroPaddedNumber(count);
  // fs.writeFile(exports.counterFile, counterString, (err) => {
  //   if (err) {
  //     throw ('error writing counter');
  //   } else {
  //     callback(null, counterString);
  //   }
  // });

  return new Promise((resolve, reject) => {
    fs.writeFile(exports.counterFile, counterString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(counterString);
      }
    });
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  // readCounter((err, count) => {
  //   if (err) {
  //     throw ('Error reading counter');
  //   } else {
  //     count++;
  //   }
  //   writeCounter(count, (err, countString) => {
  //     if (err) {
  //       throw ('Error writing counter');
  //     } else {
  //       callback(null, countString);
  //     }
  //   });
  // });
  return readCounter()
    .then((counter) => {
      counter++;
      return writeCounter(counter);
    })
    .then((res) => callback(null, res))
    .catch((err) => console.error(err));
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
