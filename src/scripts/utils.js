(function() {
  'use strict';
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyADmSh6f4AjQc9bV2RAl5qfSwuRhDA-lqQ",
    authDomain: "codeme-542e8.firebaseapp.com",
    databaseURL: "https://codeme-542e8.firebaseio.com"
  };
  firebase.initializeApp(config);
  angular.module('utils', [])
    .factory('Utils', [function() {
      return {

      };
    }]);
}());
