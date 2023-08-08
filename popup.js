chrome.runtime.sendMessage({type: "init"}, function(response) {
  console.log(response);
  document.getElementById("info").innerHTML = response;
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('Message from service worker: ', request.message);
//   // sendResponse({ message: 'Hello from popup!' });
// });