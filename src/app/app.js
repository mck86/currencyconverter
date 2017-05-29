angular.module('currencyConverter', [
	'ngRoute'
])
.config([
	'$routeProvider',
	'$locationProvider',
	'$httpProvider',
	AppConfig
])

.component('app', {
	templateUrl: 'app/app.html',
	controller: AppController
});
function AppConfig($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})
		.when('/home', {
			template: '<home page-title="$ctrl.pageTitle"></home>'
		})
		.when('/404', {
			templateUrl: 'app/components/404/404.html'
		})
		.otherwise({
			redirectTo: '/404'
		});

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.cache = false;

	$locationProvider.hashPrefix('');
}

function AppController($rootScope) {
}