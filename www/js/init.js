/*
store the version of the application
*/
function setUpVersion(callback) {
    cacheData("version",CST.appVersion);
    callback();		
}
/*
choice wich is the verry first page
*/
function setUpFirstPage(){
	var info = getInfo();
	
	if (!(isNotAccepted()) && info != null && info.timeout < new Date().getTime()) {
		changeURLToDefaultPage();
	}else{
		changeURL('#/login');
	}
}

document.addEventListener("deviceready", function(){
	// var callback = setUpFirstPage;
	// setUpVersion(callback);
	setUpPushNotification();
	setUpFirstPage();
	//StatusBar.show();
}, false);

