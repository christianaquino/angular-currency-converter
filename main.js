var app = angular.module("CurrencyApp", ["ngMaterial"]);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
    $http({
        method: 'GET',
        url: "http://api.fixer.io/latest?base=USD"
    }).then(function successCallback(response) {
        $scope.updated = response.data.date;
        $scope.rates = [{
            currency: "USD",
            value: 1
        }];
        angular.forEach(response.data.rates, function(value, key) {
            this.push({
                currency: key,
                value: value
            });
        }, $scope.rates);
    }, function errorCallback(response) {
        $scope.rates = null;
        $scope.updated = null;
    });
}]);

app.filter("convert", function() {
    return function(value, currencyFrom, currencyTo) {
      console.log(currencyFrom, currencyTo, value);
        result = value / currencyFrom * currencyTo;
        return result.toFixed(2);
    }
});
