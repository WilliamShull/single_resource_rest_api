require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $httpBackend,
      $ControllerConstructor,
      $scope;

  beforeEach(angular.mock.module('carApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('TestCarController', {$scope: $scope});
    expect(typeof controller).toBe('object');
    expect(typeof $scope).toBe('object')
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('carsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on getAll call', function() {
      $httpBackend.expectGET('/api/cars').respond(200, [{
        make: 'Ford',
        model: 'Mustang',
        year: 1968,
        color: 'black',
        sold: false,
        bodystyle: 'hatchback'
      }]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cars[0].make).toBe('Ford');
    });

    it('should be able to create a new car', function() {
      var car = {
        make: 'Datsun',
        model: '240z',
        year: 1974,
        color: 'gunmetal',
        sold: false,
        bodystyle: 'hatchback'
      };
      $httpBackend.expectPOST('/api/cars', car).respond(200, { _id: 1, msg: 'saved' });
      $scope.createCar(car);
      $httpBackend.flush();
      expect($scope.cars[0].msg).toBe('saved');
      expect($scope.newCar).toBe(null);
    });

    it('should be able to update sold status on a car', function() {
      var car = {
        _id: 1,
        make: 'Datsun',
        model: '240z',
        year: 1974,
        color: 'gunmetal',
        sold: false,
        bodystyle: 'hatchback'
      };
      $httpBackend.expectPUT('/api/cars/1', { sold: car.sold}).respond(200);
      $scope.updateCar(car);
      $httpBackend.flush();
      expect(car.editing).toBe(false);
      expect(car.status).toBe(undefined);
    });

    it('should be able to delete a car', function() {
      var car = {
        _id: 1,
        make: 'Datsun',
        model: '240z',
        year: 1974,
        color: 'gunmetal',
        sold: false,
        bodystyle: 'hatchback'
      };
      $scope.cars = [car];
      $httpBackend.expectDELETE('/api/cars/1').respond(200);
      $scope.removeCar(car);
      $httpBackend.flush();
      expect($scope.cars.length).toBe(0);
    });
  });
});
