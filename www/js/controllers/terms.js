function TermsCtrl($scope, $http){
    /*
    Constructor
    */
    
    $scope.init=function(){
        //$('<iframe id="terms" src="'+urls("terms")+'" width="100%" height="100%" style="border:none;"></iframe>').appendTo('#terms');
        var u = getInfo();
        $scope.fullName = u.firstname.toUpperCase() + " " + u.lastname.toUpperCase();
        $scope.isNotAccepted = isNotAccepted();
        $scope.isLoaded = false;
        pageReady();
        $('#terms').load(urls("terms"), function() {
            $scope.isLoaded = true;
            if ( $(window).width() < 500 ){
                $('body').css('margin-top','50px');
            }else{
                $('body').css('margin-top','100px');
            }
            $scope.$apply(function(scope) {
                scope.isLoaded = true;
            });
        });
    };
    $scope.init();
    $scope.$on('$includeContentLoaded', function(){
        // pageReady();
    });
}