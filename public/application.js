var mainApplicationModule = angular.module('mainmodule', 
	['ngRoute', 'ngResource', 'meals', 'ui.scroll', 'ui.scroll.jqlite', 'ui.bootstrap', 'ngSanitize', 'ngAnimate', 'angular-loading-bar', 'LocalStorageModule']);

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}
]);
angular.element(document).ready(function() {
	angular.bootstrap(document, ['mainmodule']);
});
