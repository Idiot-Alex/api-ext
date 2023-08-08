self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
  chrome.runtime.sendMessage({
    type: "fetch",
    event: event
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "init") {
    sendResponse("Ready");
  }
});