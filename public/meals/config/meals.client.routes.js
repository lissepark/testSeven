angular.module('meals').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'meals/views/list-meals.client.view.html'
	});
}]);