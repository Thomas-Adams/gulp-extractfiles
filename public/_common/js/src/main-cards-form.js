var baseUrl = 'http://localhost:3001/app';

var cardsApp = angular.module('cardsApp', ['ui.bootstrap', 'ngSanitize', 'ngResource', 'ngMessages']);

cardsApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

cardsApp.factory('CardsService', ['$resource', function($resource) {
    return $resource('/cards/:id', {}, {
        'update': {
            method: 'PUT'
        }
    });
}]);

cardsApp.controller('CardsController', ['$scope', CardsService, function($scope, CardsService) {

}]);
