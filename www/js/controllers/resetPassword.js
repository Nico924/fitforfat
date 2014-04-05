function ResetPasswordCtrl($scope, $http){
    /*
    Submit the ressetting of the password
    */
    $scope.submitResetPassword=function(){
        if($scope.emailValidation){
            //login check.
            var url=urls("resetPassword");
            var config={
                'data':{
                    'inputEmail':$scope.inputEmail
                }
            };
            $http.get(url,config).success(function(data){
                //data is the reponse
                if(data.success){
                    //send new random password to email.
                    alert("we have sent you a new password at this address: " + $scope.inputEmail);
                    changeURL("#/login");
                }
                else{
                    alert("This email address is not registered.");
                    //reset email input.
                    $scope.inputPassword="";
                }
            });
        }
        else{
            alert("Please enter a valid email address.");
            //reset email input.
            $scope.inputEmail="";
        }
    };
    /*
    Check if the mail adress is valide
    */
    $scope.checkEmail=function(){
        $scope.emailValidation = checkEmail($scope.inputEmail);
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        $scope.inputEmail="";
        $scope.emailValidation = false;
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            $scope.loadContent();
        }catch(e){
            alert(e);
        }
        pageReady();
    };
    $scope.init();
    $scope.$on('$includeContentLoaded', function(){
        // pageReady();
    });
}