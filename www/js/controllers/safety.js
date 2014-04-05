function SafetyCtrl($scope, $http){
    /*
    Access taining link
    */
    $scope.accessTrainingLink=function(url){
        //var ref = window.open(url, '_self', 'location=yes');
        openExternalLink(url,'navbar','','');
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        $scope.SAFETY = data;
        $scope.mail_subject = encodeURIComponent("Safety Issue / Question");
        $scope.mail_body = encodeURIComponent("Please describe your issue or question below: \n\n\n\nWe will review your information and provide a response within 24 hours.");
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'driver_id'       :getDriverID()
        };
        executeRequest("safety", config, true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            /* Is mulltiple driver vue */
            $scope.isItAllDriverView = getDriverID() == -1;
            if(!$scope.isItAllDriverView){
                $scope.loadContent();
            }
        }catch(e){
            alert(e);
        }
        
        var u = getInfo();
        var d = getCurrentDriver();
        $scope.isEditable = (u.lastname.toUpperCase()  == d.lastname && 
                             u.firstname.toUpperCase() == d.firstname);
        
        pageReady();
    };
    $scope.init();
    $scope.$on('$includeContentLoaded', function(){
        // pageReady();
    });
}