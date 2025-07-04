function redirect(){
	var debug = false;

	if(window.opener)
	{
		var separateIndex = String(location.href).indexOf("/expand.html");
		var expandBookPath = String(location.href).substr(0,separateIndex);

		try{
			window.opener.location.pathname
		}catch(e){
			location.href = expandBookPath + "/index.html" + location.hash;
			return;
		}

		
		separateIndex = String(window.opener.location.href).indexOf("/twitter/index.html")
		var openerBookPath = String(window.opener.location.href).substr(0,separateIndex);
		
		if(expandBookPath==openerBookPath){
			var isWindows = (navigator.userAgent.indexOf('Windows') >= 0);
			var isSafari = (navigator.userAgent.indexOf('Safari') >= 0) || (navigator.appVersion.indexOf("KHTML") >= 0);
			var isVersion5 = (navigator.userAgent.indexOf('Version/5.0') >= 0)
			window.opener.parent.location.href = expandBookPath + "/index.html" + location.hash;		
			
			if(isWindows && isSafari && isVersion5){
				setTimeout("winSafariClose()",100);
			}else{
				window.close();
			}
			
		}else{
			
			location.href = expandBookPath + "/index.html" + location.hash;
		}	
	}else{
		location.href = "index.html" + location.hash;
	}
}
function winSafariClose(){
	window.close();
}