var DCProductURLs = {
"mobileweb": "embedforsmartphone.html"
};

var DCshowiPhone = RegExp("AppleWebKit").test(navigator.userAgent) && RegExp("Mobile").test(navigator.userAgent);
var DCshowAndroid = RegExp("Android").test(navigator.userAgent);
var DCshowSilk = RegExp("Silk").test(navigator.userAgent);




if (DCshowiPhone || DCshowAndroid || DCshowSilk) {
	var sr = window.location.search;
	window.location.href = DCProductURLs["mobileweb"] + sr;
}
