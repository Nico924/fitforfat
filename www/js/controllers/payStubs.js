function PayStubsCtrl($scope, $http){
	/*
	Open pdf
	*/
	$scope.openPDF=function(url) {
        if ( device.platform.toLowerCase() == 'android' )
        {
            var ref = window.open("http://docs.google.com/viewer?url="+url, '_system', 'location=yes');
		    //openExternalLink("http://docs.google.com/viewer?url="+url,'','','payStubs');
        }
        else
        {
            var ref = window.open(url, '_system', 'location=yes');
        }
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
		if (data.pay_stub.length == 0) {
			alertNoData("No Paystubs available at this time");
		}else{
			for (var i = 0; i < data.pay_stub.length; i++) {

				// the week_ending is in CST, it change to UTC
				data.pay_stub[i].week_ending += getCstOffset()*60*1000;

				for (var j = 0; j < data.pay_stub[i].file.length; j++) {
					var file = data.pay_stub[i].file[j];
					switch(file.type){
						case "pay_stub":
							file.UIView = "PAY STUB";
							break;
						case "settlement":
							file.UIView = "SETTLEMENT";
							break;
						default:
							file.UIView = file.type;
					}
				}
			}
            $scope.PAY = data;
		}
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

		executeRequest("payStubs", config,true, $scope, $http, $scope.dataTreatment);
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