self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
  chrome.runtime.sendMessage({
    type: "fetch",
    event: event
  });
});

// 接收消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "init") {
    sendResponse("Ready");
  }
  if (request.type === 'init-ajax-hook') {
    console.log('Message from service worker: ', request);
    chrome.windows.getCurrent({populate: true}, function(window) {
      window.tabs.forEach(function(tab) {
        console.log(tab.window);
      })
    });
    sendResponse({message: 'hi from service worker!'});
  }
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'getVariable') {
//       // 获取页面原生 JS 定义的变量（例如 myVariable），并将其返回给 Content Script
//       var myVariable = window[request.variable];
//       sendResponse(myVariable);
//   }
// });
