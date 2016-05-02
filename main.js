var app = angular.module("CurrencyApp", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
    $http({
        method: 'GET',
        url: "http://api.fixer.io/latest?base=USD"
    }).then(function successCallback(response) {
        $scope.updated = response.data.date;
        $scope.rates = Array();
        for (key in response.data.rates) {
            $scope.rates.push({
                currency: key,
                value: response.data.rates[key]
            });
        }

        $scope.rates.push({
            currency: "USD",
            value: 1
        });
    }, function errorCallback(response) {
        $scope.rates = null;
        $scope.updated = null;
    });
}]);

app.filter("convert", function() {
    return function(value, currencyFrom, currencyTo) {
        result = value / currencyFrom * currencyTo;
        return result.toFixed(2);
    }
});
