angular.module('currencyConverter')

.service('fixer', ['$http', Fixer]);

function Fixer($http) {
	var self = this;

	self.getBaseCurrency = function(base) {
		var url = '//api.fixer.io/latest?base=' + base + '&symbols=USD,CAD,EUR';
		return $http.get(url);
	};
}