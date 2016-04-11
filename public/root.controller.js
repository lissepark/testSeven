angular.module('meals').controller('RootController', ['$scope', '$uibModal', function ($scope, $uibModal) {
    
    $scope.$on('$routeChangeSuccess', function (e, current, previous) {
		$scope.currentRoute = current;
	});
}]);