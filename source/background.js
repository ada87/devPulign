
var onBeforeSendHeaders=function(details){
	if(details.requestHeaders){
		var headers = details.requestHeaders;
		for(var i=0,j=headers.length;i<j;i++){
			var header = headers[i];
			if(header.name=="User-Agent"){
				details.requestHeaders[i].value="";
			}
		}
	}
	return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(
	onBeforeSendHeaders,
	{urls: ["<all_urls>"]}, 
	["blocking", "requestHeaders"]);

