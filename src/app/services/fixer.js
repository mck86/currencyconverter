angular.module('currencyConverter')

.service('fixer', ['$http', '$sce', Fixer, ]);

function Fixer($http, $sce) {
    var self = this;

    self.getBaseCurrency = function(base) {
        var url = "http://api.fixer.io/latest?base=" + base + "&symbols=USD,CAD,EUR";
        var trustedUrl = $sce.trustAsResourceUrl(url);

        return $http.jsonp(trustedUrl, { jsonpCallbackParam: 'callback' });
    };
}
