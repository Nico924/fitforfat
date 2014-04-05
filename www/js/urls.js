var urls = function(lnk){
	
	var login = 'http://qaportal.modetransportation.com/DriverServices/services/login';
	var resetPassword = 'data/resetPassword.json';

	switch(lnk){
		case "profile":
			// return profile;
			return getInfo().url_base_path + "driver/profile";
			break;
		case "profileContactDetail":
			// return profileContactDetail;
			return getInfo().url_base_path + "driver/additional";
			break;
		case "profileChangeValue":
			return getInfo().url_base_path + "driver/changevalue";
			break;
		case "payStubs":
			return getInfo().url_base_path + "driver/paystubs";
			// return payStubs;
			break;
		case "safety":
			// return safety;
			return getInfo().url_base_path + "safetytraining";
			break;
		case "dashboardFuelDetail":
			// return dashboardFuelDetail;
			return getInfo().url_base_path + "driver/fueldetail";
			break;
		case "dashboard":
			return getInfo().url_base_path + "driver/dashboard";
			break;
		case "tenders":
			return getInfo().url_base_path + "tender/preplan";
			// return "data/tenders.json";
			break;
		case "tendersTrip":
			return getInfo().url_base_path + "tender/tripplan";
			// return 'data/tendersTrip.json';
			break;
		case "tendersHistory":
			return getInfo().url_base_path + "tender/history";
			// return tendersHistory;
			break;
		case "changePassword":
			return getInfo().url_base_path + "login/changepassword";
			break;
		case "login":
			return login;
			break;
		case "resetPassword":
			return resetPassword;
			break;
		case "listOfValues":
			return getInfo().url_base_path + "app/lov";
			break;
		case "tripAcceptation":
			return getInfo().url_base_path + "tender/action";
			break;
		case "terms":
			return getInfo().url_terms;
			break;

		default:
			return "";
	}
}