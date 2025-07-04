var DCProductURLs = {
  "mobileweb": "html5m.html"
};

var DCshowiPhone = RegExp("AppleWebKit").test(navigator.userAgent) && RegExp("Mobile").test(navigator.userAgent);
var DCshowAndroid = RegExp("Android").test(navigator.userAgent);
var DCshowSilk = RegExp("Silk").test(navigator.userAgent);
var isiPad = navigator.userAgent.toLowerCase().indexOf('ipad') >= 0 || ((window.navigator.platform == "MacIntel" && window.navigator.userAgent.indexOf("Safari") != -1 && window.navigator.userAgent.indexOf("Chrome") == -1) && (window.navigator["maxTouchPoints"] !== undefined && window.navigator["maxTouchPoints"] > 0));




if (DCshowiPhone || DCshowAndroid || DCshowSilk || isiPad) {
var hs = window.location.hash;
var p = hs.substr(1)
if(Number(p)>0) hs = "#page="+p;
var sr = window.location.search;
if(sr=="") {
    sr = "?s=12";
} else {
    sr += "&s=12";
}
if(hs=="") hs = "#page=1";
window.location.href = DCProductURLs["mobileweb"] + sr + hs;
}
