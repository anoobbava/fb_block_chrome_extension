chrome.runtime.onMessage.addListener(function(request,sender) {
	if (request.type === 'errorMessage') {
		var ist = new Date();
		var ist_formatted = ist.toString().replace(/GMT.+/,"");
		var hour = ist.getHours();
			if (hour >= 14 && hour <= 17 || hour >= 9 ) {
				 var tabId = sender.tab.id;
			new Notification(ist_formatted,{
    		icon: 'fb_block_icon.png',
    		body: 'faceBook Blocked Time'
  		});
			callback(tabId);
		}
	}
});

function callback(tabId) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
        	chrome.tabs.remove(tabId);
    }
}




// // if (undefined != tabId)
//   		// 	chrome.tabs.remove(tabId);
//   			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     			if (changeInfo.status == 'complete') {
//         		chrome.tabs.remove(tabId);
//     			}
// 				});