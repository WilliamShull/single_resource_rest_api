module.exports = function(app) {
  app.controller('carsController', ['$scope', '$http', function($scope, $http) {
    $scope.cars = [];

    $scope.getAll = function() {
      $http.get('/api/cars')
        .then(function(res) {
          $scope.cars = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createCar = function(car) {
      $http.post('/api/cars', car)
        .then(function(res) {
          $scope.cars.push(res.data);
          $scope.newCar = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateCar = function(car) {
      car.status = 'pending';
      $http.put('/api/cars/' + car._id, {sold: car.sold})
        .then(function(res) {
          delete car.status;
          car.editing = false;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.removeCar = function(car) {
      car.status = 'pending';
      $http.delete('/api/cars/' + car._id)
        .then(function() {
          $scope.cars.splice($scope.cars.indexOf(car), 1);
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
