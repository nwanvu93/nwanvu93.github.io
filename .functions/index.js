/**
 * Copyright 2017 Nwanvu Inc. All Rights Reserved.
 */

const functions = require('firebase-functions');
const round = require('round-to');
const microtime = require('microtime');

exports.roundingRatingOnCreate = functions.database.ref('/moreapps/{index}').onCreate(event => { return handleEvent(event); });
exports.roundingRatingOnUpdate = functions.database.ref('/moreapps/{index}').onUpdate(event => { return handleEvent(event); });
exports.roundingRatingOnCreateDebug = functions.database.ref('/debug/moreapps/{index}').onCreate(event => { return handleEvent(event); });
exports.roundingRatingOnUpdateDebug = functions.database.ref('/debug/moreapps/{index}').onUpdate(event => { return handleEvent(event); });

function handleEvent(event) {
  var appUpdatedSnapshot = event.data.child('updated');
  if (appUpdatedSnapshot && appUpdatedSnapshot.changed()) {
    console.log('SKIP: updated just changed');
    return false;
  }

  const app = event.data.val();
  if (app) {
    var rating = app.rating;
    if(rating && rating > 3) {
      app.rating = round(rating, 1);
      event.data.ref.update({ rating: app.rating });
      console.log('roundingRatingDebug: %d', app.rating);
    }

    var millis = microtime.now() / 1000;
    if(app.updated) {
      event.data.ref.update({ updated: millis });
    } else {
      event.data.ref.child('updated').set(millis);
    }
  }

  return true;
}
