require(["dojo/_base/declare",
		"dojo/_base/connect",		
		"ecm/model/Desktop",		
		"DatePluginDojo/ValueFormatter"		
		], 
function(declare, connect,  Desktop, ValueFormatter) {
	if (Desktop.id == "admin" || Desktop.id=="icmadmin") {
		// plugin in effect only for icm desktop
		return;
	}
	
	console.log("is it 1push to remote repository and back to build ???:");
	 Desktop.valueFormatter = new ValueFormatter();
	connect.connect(ecm.model.desktop, "onLogin", function() {
		console.log("updating with icm.util.Util only for icm desktop");
		icm.util.Util.getLocaleDate = function(date, selector) {
		
		var format = {selector: selector, fullYear: true, formatLength: "short",datePattern:"yyyyMMdd",timePattern:"HH:mm:ss",locale:"fr"};
		return this.formatLocaleDate(date, format);
	}


	});
});
