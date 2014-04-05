function externalLinkCtrl($scope, $http, $routeParams){
    
    $scope.goBack=function() {
        changeURL('#/'+$routeParams.back);
    };

    $scope.init=function(){
        pageReady();
        
        $scope.url = $routeParams.url;
        $scope.navbar = $routeParams.navbar;
        $scope.title = $routeParams.title;
        $scope.back = $routeParams.back;

    };
    
    $scope.showNavbar=function() {
        alert('init toggleMenu');
        if ( $scope.navbar == 'navbar' )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    $scope.init();   
    $scope.$apply();
}
