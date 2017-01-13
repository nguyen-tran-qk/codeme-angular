'use strict';

angular.module('appControllers', [])
  .controller('MainCtrl', function($scope, $location, $state, Utils) {
  	$scope.user = Utils.firebaseApp.auth().currentUser;
  	if (!$scope.user) {
  		$state.go('app.login');
  	}
    $scope.logout = function() {
      Utils.firebaseApp.auth().signOut().then(function() {
        // Sign-out successful.
        $scope.user = null;
        // $state.go('app.login');
      }, function(error) {
        // An error happened.
      });
    };
    Utils.firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $scope.user = user;
        $state.go('app.dashboard.overview');
      } else {
        // No user is signed in.
        $state.go('app.login');
      }
    });
  });
