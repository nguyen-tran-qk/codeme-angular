(function() {
  'use strict';
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyADmSh6f4AjQc9bV2RAl5qfSwuRhDA-lqQ",
    authDomain: "codeme-542e8.firebaseapp.com",
    databaseURL: "https://codeme-542e8.firebaseio.com"
  };
  var firebaseApp = firebase.initializeApp(config);
  var firepadRefs = firebase.database().ref('firepadInstances');
  // firebase.database.enableLogging(true);
  angular.module('utils', [])
    .factory('Utils', [function() {
      return {
        firebaseApp: firebaseApp,
        firepadRefs: firepadRefs
      };
    }]);
}());
