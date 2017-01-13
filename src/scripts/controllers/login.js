'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
angular.module('appControllers')
  .controller('LoginCtrl', function($scope, $location, $state, Utils) {
  	if ($scope.user) {
  		$state.go('app.dashboard.overview');
  	}
    $scope.$state = $location;
    $scope.submit = function() {
    	$scope.errorMessage = '';
      firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
        // Handle Errors here.
        $scope.errorMessage = error.message;
      });
      // $location.path('/dashboard');

      // return false;
    };

  });
