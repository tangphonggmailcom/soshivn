/**
 * lwUACheck
 * 0.9.4
 * @param ua
 */
var lwUACheck = function (ua) {

    //※userAgent
    this.userAgent = (ua || window.navigator.userAgent);

    //※userAgentLowerCase
    this.userAgentLowerCase = this.userAgent.toLowerCase();

    //※browser
    if (this.userAgentLowerCase.indexOf('msie') >= 0 || this.userAgentLowerCase.indexOf('trident') >= 0) {
        // IE
        this.browser = 'ie';
    } else if (this.userAgentLowerCase.indexOf('edge') != -1) {
        // Edge
        this.browser = 'edge';
    } else if (this.userAgentLowerCase.indexOf('chrome') != -1) {
        // Google Chrome
        this.browser = 'chrome';
    } else if (this.userAgentLowerCase.indexOf('firefox') != -1) {
        // FireFox
        this.browser = 'firefox';
    } else if (this.userAgentLowerCase.indexOf('safari') != -1) {
        // Safari
        this.browser = 'safari';
    } else if (this.userAgentLowerCase.indexOf('opera') != -1) {
        // Opera
        this.browser = 'opera';
    } else if (this.userAgentLowerCase.indexOf('gecko') != -1) {
        // Gecko
        this.browser = 'gecko';
    } else {
        this.browser = null;
    }

    //※PC Browser Check
    this.isIE = (this.browser == 'ie');
    this.isEdge = (this.browser == 'edge');
    this.isChrome = (this.browser == 'chrome');
    this.isSafari = (this.browser == 'safari');
    this.isFirefox = (this.browser == 'firefox');

    //※Mobile Check
    this.isiPhone = (this.userAgentLowerCase.indexOf('iphone') >= 0);
    this.isiPod = (this.userAgentLowerCase.indexOf('ipod') >= 0);
    this.isiPad = (this.userAgentLowerCase.indexOf('ipad') >= 0);
    this.isiOS = (this.isiPhone || this.isiPod || this.isiPad);
    this.isAndroid = (this.userAgentLowerCase.indexOf('android') >= 0);
    this.isMobile = (this.isiOS || this.isAndroid);
    this.isTablet = (this.isiPad || (this.isAndroid && this.userAgentLowerCase.indexOf('mobile') < 0));

    //※verIE
    if (this.isIE) {
        var verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(this.userAgentLowerCase);
        if (verArray) {
            this.verIE = String(verArray[2]);
        }
    } else {
        this.verIE = null;
    }

    //※verChrome
    if (this.isChrome) {
        if (this.userAgentLowerCase.match(/chrome\/([0-9_.]+)/)) {
            this.verChrome = String(RegExp.$1).split("_").join(".");
        }
    } else {
        this.verChrome = null;
    }

    //※verIOS
    if (this.isiOS) {
        if (this.userAgentLowerCase.match(/cpu iphone os ([0-9_.]+)/)) {
            // ※iPhone,iPod用
            this.veriOS = String(RegExp.$1).split("_").join(".");
        } else if (this.userAgentLowerCase.match(/cpu os ([0-9_.]+)/)) {
            // ※iPad用
            this.veriOS = String(RegExp.$1).split("_").join(".");
        }
    } else {
        this.veriOS = null;
    }

    //※verAndroid
    if (this.isAndroid) {
        if (this.userAgentLowerCase.match(/android ([0-9_.]+)/)) {
            this.verAndroid = String(RegExp.$1).split("_").join(".");
        }
    } else {
        this.verAndroid = null;
    }

    //※isWindows
    this.isWindows = (this.userAgentLowerCase.indexOf('windows nt') >= 0);

    //※verWindows
    if (this.isWindows) {
        if (this.userAgentLowerCase.match(/windows nt ([0-9_.]+)/)) {
            this.verWindows = String(RegExp.$1).split("_").join(".");
        }
    } else {
        this.verWindows = null;
    }

    //※isMacOSX
    this.isMacOSX = (this.userAgentLowerCase.indexOf('mac os x') >= 0 && !this.isMobile);

    //※verMacOSX
    if (this.isMacOSX) {
        if (this.userAgentLowerCase.match(/mac os x ([0-9_.]+)/)) {
            this.verMacOSX = String(RegExp.$1).split("_").join(".");
        }
    } else {
        this.verMacOSX = null;
    }


};

/**
 * verIE_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.verIE_over = function (minVer, maxVer) {

    if (this.isIE) {
        var current = this.verIE;
        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }

};

/**
 * verChrome_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.verChrome_over = function (minVer, maxVer) {

    if (this.isChrome) {

        var current = this.verChrome;

        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }

};

/**
 * veriOS_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.veriOS_over = function (minVer, maxVer) {

    if (this.isiOS) {

        var current = this.veriOS;

        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }

};

/**
 * verAndroid_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.verAndroid_over = function (minVer, maxVer) {

    if (this.isAndroid) {

        var current = this.verAndroid;

        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }
};

/**
 * verWindows_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.verWindows_over = function (minVer, maxVer) {

    if (this.isWindows) {

        var current = this.verWindows;

        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }

};

/**
 * verMacOSX_over
 * @param minVer
 * @param maxVer
 * @returns {boolean}
 */
lwUACheck.prototype.verMacOSX_over = function (minVer, maxVer) {

    if (this.isMacOSX) {

        var current = this.verMacOSX;

        var min = String(minVer);
        var max = (maxVer !== undefined) ? String(maxVer) : null;
        var result = false;
        if(max){
            result = this.minVerCheck(current, min) && this.maxVerCheck(current, max);
        }else{
            result = this.minVerCheck(current, min);
        }
        return result;
    } else {
        return false;
    }

};


/**
 * minVerCheck
 * @param current
 * @param min
 * @returns {boolean}
 */
lwUACheck.prototype.minVerCheck = function (current, min) {

    var minVersions = this.getVersions(min);
    var currentVersions = this.getVersions(current);

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

};


/**
 * maxVerCheck
 * @param current
 * @param max
 * @returns {boolean}
 */
lwUACheck.prototype.maxVerCheck = function (current, max) {

    var maxVersions = this.getVersions(max);
    var currentVersions = this.getVersions(current);

    if (maxVersions[0] > currentVersions[0]) {
        return true;
    } else if (currentVersions[0] > maxVersions[0]) {
        return false;
    }

    if (maxVersions[1] > currentVersions[1]) {
        return true;
    } else if (currentVersions[1] > maxVersions[1]) {
        return false;
    }

    if (maxVersions[2] > currentVersions[2]) {
        return true;
    } else if (currentVersions[2] > maxVersions[2]) {
        return false;
    }

    return true;

};

/**
 * getVersions
 * @param ver
 * @returns {Array}
 */
lwUACheck.prototype.getVersions = function (ver) {

    var versions = String(ver).split('.');

    for (var i=versions.length; i<3; i++) {
        versions.push(0);
    }

    for(var j=0; j<versions.length; j++){
        versions[j] = parseInt(versions[j], 10);
    }

    return versions;

};

/**
 * verIE_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.verIE_eq = function (equalVer) {

    if (this.isIE) {
        var equal = String(equalVer);
        var current = this.verIE;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};

/**
 * verChrome_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.verChrome_eq = function (equalVer) {

    if (this.isChrome) {
        var equal = String(equalVer);
        var current = this.verChrome;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};

/**
 * veriOS_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.veriOS_eq = function (equalVer) {

    if (this.isiOS) {
        var equal = String(equalVer);
        var current = this.veriOS;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};

/**
 * verAndroid_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.verAndroid_eq = function (equalVer) {

    if (this.isAndroid) {
        var equal = String(equalVer);
        var current = this.verAndroid;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};

/**
 * verWindows_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.verWindows_eq = function (equalVer) {

    if (this.isWindows) {
        var equal = String(equalVer);
        var current = this.verWindows;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};

/**
 * verMacOSX_eq
 * @param equalVer
 * @returns {boolean}
 */
lwUACheck.prototype.verMacOSX_eq = function (equalVer) {

    if (this.isMacOSX) {
        var equal = String(equalVer);
        var current = this.verMacOSX;
        var result = this.equalVerCheck(current, equal);
        return result;
    } else {
        return false;
    }

};


/**
 * equalVerCheck
 * @param current
 * @param equal
 * @returns {boolean}
 */
lwUACheck.prototype.equalVerCheck = function (current, equal) {

    var equalVersions = String(equal).split('.');
    for(var i=0; i< equalVersions.length; i++){
        equalVersions[i] = parseInt(equalVersions[i], 10);
    }

    var currentVersions = String(current).split('.');
    for(var j=0; j<currentVersions.length; j++){
        currentVersions[j] = parseInt(currentVersions[j], 10);
    }

    for (var k=0; k<equalVersions.length; k++) {
        if(equalVersions[k] !== currentVersions[k]){
            return false;
        }
    }

    return true;

};