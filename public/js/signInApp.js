var app = angular.module('NAYASignIn', ['ui.bootstrap','LoginCtrl'])
.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
