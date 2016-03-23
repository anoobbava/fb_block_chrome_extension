// it will run when the content script matches.. and sent a message to background scripts file
// content scripts alone cant handle the codes

chrome.runtime.sendMessage({type:'errorMessage'});