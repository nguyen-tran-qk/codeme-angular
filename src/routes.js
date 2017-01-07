angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.when('/dashboard', '/dashboard/overview');
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('app', {
      // abstract: true,
      url: '',
      templateUrl: 'views/base.html'
    })
    .state('app.login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      abstract: true,
      templateUrl: 'views/dashboard.html',
    })
    .state('app.dashboard.overview', {
      url: '/overview',
      templateUrl: 'views/dashboard/overview.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vm'
    })
    .state('app.dashboard.reports', {
      url: '/reports',
      templateUrl: 'views/dashboard/reports.html'
    });
}
