var o = getQueryString();
if(o.tco){
	var pathName = window.location.pathname;
	pathName = pathName.replace(/index.html/,"expand.html");
	var redirectUrl = window.location.protocol +'//'+ window.location.hostname + pathName + '#' + window.location.search.substring(1);
	window.location.href = redirectUrl;
}

function getQueryString()
{
    if( 1 < window.location.search.length )
    {
        var query = window.location.search.substring(1);
        var parameters = query.split('&');
        var result = {};
        for( var i = 0; i < parameters.length; i++ )
        {
            var el = parameters[i].split('=');
            var paramName = decodeURIComponent(el[0]);
            var paramValue = decodeURIComponent(el[1]);
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return {};
}
