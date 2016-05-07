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

    $scope.updateResult = function() {
        if ($scope.value && $scope.currencyFrom.value && $scope.currencyTo.value) {
            var result = $scope.value / $scope.currencyFrom.value * $scope.currencyTo.value;
            $scope.result = parseFloat(result.toFixed(3));
        }
    }
}]);

app.filter("convert", function() {
    return function(value, currencyFrom, currencyTo) {
        result = value / currencyFrom * currencyTo;
        return result.toFixed(3);
    }
});
