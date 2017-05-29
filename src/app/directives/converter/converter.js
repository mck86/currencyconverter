angular.module('currencyConverter')

.directive('converterDirective', function($q, $filter, fixer, toast) {
	return {
		restrict: 'E',
		templateUrl: 'app/directives/converter/converter.html',
		scope: true,
		link: function(scope, element, attribute) {
			var promises = [];
			scope.converterDirective = {
				currencyList: ['CAD','USD','EUR'],
				baseAmount: null,
				baseCurrency: "CAD",
				convertedAmount: null,
				convertedCurrency: "USD",
				loaded: false,
				disclaimer: false,
				currencies: {},
				calculateBase: function() {
					if(isNaN(Number(this.convertedAmount))) {
						this.baseAmount = "";
					} else {
						this.baseAmount = (this.convertedCurrency === this.baseCurrency) ? this.convertedAmount : Number(parseFloat(parseFloat(this.currencies[this.convertedCurrency][this.baseCurrency]) * parseFloat(this.convertedAmount || 1)).toFixed(2));
					}
				},
				calculateConverted: function() {
					if(isNaN(Number(this.baseAmount))) {
						this.convertedAmount = "";
					} else {
						this.convertedAmount = (this.convertedCurrency === this.baseCurrency) ? this.baseAmount : Number(parseFloat(parseFloat(this.currencies[this.baseCurrency][this.convertedCurrency]) * parseFloat(this.baseAmount || 1)).toFixed(2));
					}
				}
			};

			angular.forEach(scope.converterDirective.currencyList, function(currency) { // collecting currency promises for $q.all
	            promises.push(fixer.getBaseCurrency(currency));
	        });

			$q.all(promises).then(
				function onSuccess(resp) {
					angular.forEach(resp, function(value, key) {
						scope.converterDirective.currencies[value.data.base] = value.data.rates;
					});
					scope.converterDirective.loaded = true;
				},
				function onError(resp) {
					toast.error("Could not retrieve data!");
				}
			);
		}
	};
});