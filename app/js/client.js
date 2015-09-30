require('angular/angular');

var restApp = angular.module('restApp', []);

restApp.controller('descriptionController', ['$scope', function($scope) {
  $scope.description = 'This app allows you to view, create, update, and remove cars from a database.';
}]);
