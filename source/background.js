
var onBeforeSendHeaders=function(details){
	if(details.requestHeaders){
		var headers = details.requestHeaders;
		if(Config.get(Config.UA.UASTR)){
			for(var i=0,j=headers.length;i<j;i++){
				var header = headers[i];
				if(header.name=="User-Agent"){
					details.requestHeaders[i].value=Config.get(Config.UA.UASTR);
				}
			}
		}
	}
	return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(
								onBeforeSendHeaders,
								{urls: ["<all_urls>"]}, 
								["blocking", "requestHeaders"]
							);

