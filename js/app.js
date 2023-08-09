(function(){
  // start
  initAjaxHook();
  if (document.readyState !== "loading") {
    onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "request") {
      console.log('request', request.data);
    }
    if (request.message === "response") {
      console.log('response', request.data);
    }
    sendResponse({ message: "Hi from content script" })
  });

  function onReady() {
    console.log('DOM is ready!');
    initApp();
    createPanel();
    createSwitch();
  }

  function initApp() {  
    // init appExt div
    const app = document.createElement("div");
    app.setAttribute("id", "hotstrip-appExt");
    document.body.appendChild(app);

    // init style
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "css/style.css");
    document.head.appendChild(link);
  }

  function createSwitch() {
    const app = document.getElementById('hotstrip-appExt');
    // 创建 div 元素
    const appSwitch = document.createElement('div');
    appSwitch.id = 'hotstrip-appSwitch';
    app.appendChild(appSwitch);

    // 创建 input 元素
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hotstrip-checkbox';

    // 创建 label 元素
    const label = document.createElement('label');
    label.id = 'hotstrip-label';
    label.setAttribute('for', 'hotstrip-checkbox');
    label.classList.add('hotstrip-toggle');

    // 创建 div 元素1
    const bar1 = document.createElement('div');
    bar1.classList.add('hotstrip-bars');
    bar1.id = 'hotstrip-bar1';

    // 创建 div 元素2
    const bar2 = document.createElement('div');
    bar2.classList.add('hotstrip-bars');
    bar2.id = 'hotstrip-bar2';

    // 创建 div 元素3
    const bar3 = document.createElement('div');
    bar3.classList.add('hotstrip-bars');
    bar3.id = 'hotstrip-bar3';

    // 将 div 元素添加到 label 元素中
    label.appendChild(bar1);
    label.appendChild(bar2);
    label.appendChild(bar3);

    // 将 input 元素和 label 元素添加到 app 元素中
    appSwitch.appendChild(checkbox);
    appSwitch.appendChild(label);

    // 添加事件监听器
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        document.getElementById('hotstrip-appPanel').classList.add('hotstrip-panel-show');
      } else {
        document.getElementById('hotstrip-appPanel').classList.remove('hotstrip-panel-show');
      }
    });
  }

  function createPanel() {
    const app = document.getElementById('hotstrip-appExt');
    // create a div element
    const appPanel = document.createElement('div');
    appPanel.id = 'hotstrip-appPanel';
    appPanel.classList.add('hotstrip-panel')

    // set its content and styles
    appPanel.innerHTML = 'Hello, World!';

    // append it to the body of the page
    app.appendChild(appPanel);
  }

  function initAjaxHook() {
    const ajaxHookScript = document.createElement("script");
    ajaxHookScript.src = chrome.runtime.getURL("js/ajaxhook.min.js");
    document.head.appendChild(ajaxHookScript);

    const sdkScript = document.createElement("script");
    sdkScript.src = chrome.runtime.getURL("js/sdk.js");
    document.head.appendChild(sdkScript);

    console.log('ajaxHook is ready', window.ah)
    // const ah = window.ah;
    // // 发送消息到 service worker
    chrome.runtime.sendMessage({type: 'init-ajax-hook'}, response => {
      console.log('收到来自 service worker 的回复：', response);
    });
  }
})();