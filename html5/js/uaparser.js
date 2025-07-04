
var ua = {
    'ver': '0'
};
ua.name = window.navigator.userAgent.toLowerCase();


ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
ua.isEdge = ua.name.indexOf('edge') >= 0;
ua.isSafari = (ua.name.indexOf('safari') >= 0 && ua.name.indexOf('chrome') == -1);
ua.isiPhone = ua.name.indexOf('iphone') >= 0;
ua.isiPod = ua.name.indexOf('ipod') >= 0;
ua.isiPad = ua.name.indexOf('ipad') >= 0;
ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
ua.isAndroid = ua.name.indexOf('android') >= 0;
ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));


if (ua.isIE) {
    ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
    if (ua.verArray) {
        ua.ver = ua.verArray[2];
    }
}
if (ua.isiOS) {
    uaindex = ua.name.indexOf('cpu iphone os ');
    if (uaindex > -1)  {
        ua.name.match(/cpu iphone os ([0-9_.]+)/);
        ua.ver = RegExp.$1.replace(/_/g, '.');
    }
}
if (ua.isiPad) {
    uaindex = ua.name.indexOf('cpu os ');
    if (uaindex > -1)  {
        ua.name.match(/cpu os ([0-9_.]+)/);
        ua.ver = RegExp.$1.replace(/_/g, '.');
    }
}
if (ua.isAndroid) {
    uaindex = ua.name.indexOf('android ');
    if (uaindex > -1)  {
        ua.name.match(/android ([0-9_.]+)/);
        ua.ver = RegExp.$1;
    }
}


function checkUAVer(current, min) {

  var minVersions = min.split('.');
  for (var i = minVersions.length; i < 3; i++) {
    minVersions.push(0);
  }
  minVersions = minVersions.map(function(num){
    return parseInt(num, 10);
  });

  var currentVersions = current.split('.');
  for (var i = currentVersions.length; i < 3; i++) {
    currentVersions.push(0);
  }
  currentVersions = currentVersions.map(function(num){
    return parseInt(num, 10);
  });



  if (minVersions[0] < currentVersions[0]) {
    return true;
  } else if (currentVersions[0] < minVersions[0]) {
    return false;
  }

  if (minVersions[1] < currentVersions[1]) {
    return true;
  } else if (currentVersions[1] < minVersions[1]) {
    return false;
  }

  if (minVersions[2] < currentVersions[2]) {
    return true;
  } else if (currentVersions[2] < minVersions[2]) {
    return false;
  }

  return true;
}




















