controllers.controller('StoreController', ['$scope','$http', function($scope,$http) {
	$scope.loadProducts=function(){
        $http.get("data/products.json").success(function(data){
                $scope.products=data;
        });
    }
    /*
    Constructor
    */
    $scope.init=function(){
        $scope.loadProducts();

    }
    $scope.init();
}]);