function RejectReasonCtrl($scope, $http,$routeParams){
    /*
    Send Reject Confirmation
    */
    $scope.rejectConfirmation = function(code,statement) {
        popUp('CONFIRM REJECTION REASON?','','black', null , function(){
            tripAcceptation($http,$routeParams.TripID,"reject",code,statement, function(data){
                if(data.success){
                    changeURL('#/tenders');
                }else{
                    alertOk(data.errorMsg.join(" - "));
                }
            });
        });
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        $scope.REASONS = data;
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'list_key'        :"CMKI_REJECT_REASONS"
        };

        executeRequest("listOfValues", config, true, $scope, $http, $scope.dataTreatment);
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