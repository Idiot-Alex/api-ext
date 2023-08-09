(function() {
  function init() {
    setTimeout(() => {
      if (window.ah) {
        window.ah.proxy({
          onRequest: (config, handler) => {
            // console.log('onRequest', config)
            chrome.runtime.sendMessage({type: 'request', data: config}, response => {
              console.log('收到来自 service worker 的回复：', response);
            });
            handler.next(config);
          },
          onError: (err, handler) => {
            // console.log('onError', err)
            handler.next(err)
          },
          onResponse: (response, handler) => {
            // console.log('onResponse', response)
            chrome.runtime.sendMessage({type: 'response', data: response}, response => {
              console.log('收到来自 service worker 的回复：', response);
            });
            handler.next(response)
          }
        })
      } else {
        console.log('sdk is not ready');
        init();
      }
    }, 200);
  }

  init();
})();

