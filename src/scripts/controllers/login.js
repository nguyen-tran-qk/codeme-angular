'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
angular.module('appControllers')
  .controller('LoginCtrl', function($scope, $location, $state) {
  	$scope.$state = $location;
    $scope.submit = function() {
      $location.path('/dashboard');

      return false;
    }

  });
