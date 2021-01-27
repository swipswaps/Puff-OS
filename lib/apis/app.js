console.time("window.load");
var frameworks = ["jquery", "jquery-ui", "bootstrap", "mousetrap"];
var timeout = 1000;

function importfile(url) {
  if (url.includes("js")) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    head.appendChild(script);
  } else {
    const head = document.getElementsByTagName('head')[0];
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", url);
    head.appendChild(stylesheet);
  }
  console.log("imported " + url + "...");
}

function loadFont(name) {
  var url = "https://fonts.googleapis.com/css2?family=" + name + ":wght@400;500;700&display=swap";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let css = xhr.responseText;
      css = css.replace(/}/g, 'font-display: swap; }');
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
      $("head").append("<style>html,body,button,select,input,textarea{font-family:" + name + ";}</style>");
      font.log("loaded font '" + name + "'");
    } else if (xhr.status !== 200) font.log("font '" + name + "' does not exist", "error", xhr);
  };
  xhr.send();
}

var appTitle = document.title;
var app; // define app instance

window.onload = function() {
  console.timeEnd("window.load");
  if (!appTitle || !appVersion) {
    parent.desktop.log("App error: no name or version!", "error");
  } else {
    console.info("Running app '" + appTitle + "' (" + appVersion + ")...");
    // frameworks (external)
    frameworks.forEach(function(item) {
      setTimeout(function() {
        importfile("/lib/frameworks/" + item + ".min.js");
      }, timeout);
      timeout = timeout + 500;
    });
    // interface
    importfile("/lib/gui.css");
    setTimeout(function() {
      // app files
      importfile("/apps/" + appTitle + ".ap/index.css");
      importfile("/apps/" + appTitle + ".ap/index.js");
      // system font
      loadFont("Rubik");
      parent.processes.forEach(function(item) {
        if (item.name === appTitle) {
          app = parent.processes[parent.processes.indexOf(item)];
        }
      });
      $("form").on("submit", function(event) {
        event.preventDefault();
      });
      $("*").each(function(index, item) {
        if ($(this).css("cursor") === "pointer") {
          $(this).css("cursor", "url('/res/cursors/pointer.png'), auto");
        }
      });
      parent.start(app.id);
    }, timeout);
  }
}