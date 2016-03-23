

var d = new Date();
	var n = d.getHours();
	if (n == 13)
		localStorage.count = 0;

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
			if (initializeCount(hour)== 3)
				displayWarning();
		}
	}
});

// this method is to remove the current tab which is accessing the facebook
function callback(tabId) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
        	chrome.tabs.remove(tabId);
    }
}

// check for the count of fb attempts in day...
function initializeCount(hour) {
	if (hour == 1)
	{
		localStorage.count = 0;
	}
	else{
			if (!localStorage.count)
				localStorage.count = 0;
		localStorage.count++;
		alert(localStorage.count);
	}
	return localStorage.count;
}

function displayWarning(){
	new Notification('3 attempts',{
		icon: 'fb_warning.jpg',
		body: 'warning---> IP to HR!!!'
	});
}
	
	

// getLocalIPs(function(ips) { // <!-- ips is an array of local IP addresses.
//     document.body.textContent = 'Local IP addresses:\n ' + ips.join('\n ');
// });

// function getLocalIPs(callback) {
//     var ips = [];

//     var RTCPeerConnection = window.RTCPeerConnection ||
//         window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

//     var pc = new RTCPeerConnection({
//         // Don't specify any stun/turn servers, otherwise you will
//         // also find your public IP addresses.
//         iceServers: []
//     });
//     // Add a media line, this is needed to activate candidate gathering.
//     pc.createDataChannel('');
    
//     // onicecandidate is triggered whenever a candidate has been found.
//     pc.onicecandidate = function(e) {
//         if (!e.candidate) { // Candidate gathering completed.
//             pc.close();
//             callback(ips);
//             return;
//         }
//         var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
//         if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
//             ips.push(ip);
//     };
//     pc.createOffer(function(sdp) {
//         pc.setLocalDescription(sdp);
//     }, function onerror() {});
// }