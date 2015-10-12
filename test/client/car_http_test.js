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
        make: 'ford',
        model: 'mustang',
        year: 1968,
        color: 'black',
        sold: false,
        bodystyle: 'hatchback'
      }]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cars[0].make).toBe('ford');
    });

    it('should be able to create a new car', function() {
      $httpBackend.expectPOST('/api/cars', )
    });

    it('should be able to update sold status on a car', function() {
      expect(null).toBe(null);
    });

    it('should be able to delete a car', function() {
      expect(null).toBe(null);
    });
  });
});
