module.exports = function(app) {
  app.directive('carForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/cars/directives/car_view.html'
      scope: {
        labelText: '@',
        buttonText: '@',
        note: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    }
  });
};
