angular.module('currencyConverter').component('home', {
    templateUrl: 'app/components/home/home.html',
    controller: HomeController
});

function HomeController($rootScope) {
	var self = this;
	
	self.$onInit = function() {
	};
}