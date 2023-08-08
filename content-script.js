(function() {
  // init appExt div
  const app = document.createElement("div");
  app.setAttribute("id", "hotstrip-appExt");
  document.body.appendChild(app);

  // init style
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "style.css");
  document.head.appendChild(link);
})();

