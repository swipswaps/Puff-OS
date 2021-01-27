var network = {
  connection: function() {
    return navigator.connection;
  },
  type: function() {
    return navigator.connection.effectiveType;
  },
  wentOnline: function(callback) {
    document.addEventListener("online", callback, false);
  },
  wentOffline: function(callback) {
    document.addEventListener("offline", callback, false);
  },
  online: function() {
    return navigator.onLine ? true : false;
  },
  request: function(url, success, error, type = "POST", action, fields = {}, json) {
    var request = new Process("network.request");
    if (url) {
      var data = {};
      if (fields) data = fields;
      if (action) data['action'] = action;
      $.ajax({
        type: type,
        url: url,
        data: data,
        success: function(response) {
          if (success) success(response);
          request.log("web.request successful");
        },
        error: function(errorresponse) {
          if (error) error(errorresponse);
          request.log("web.request failed", "error", errorresponse);
        }
      });
    }
    request.kill();
  },
  ping: function(url) {
    var ping = new Process("network.ping");
    system.stopwatch("ping " + url);
    network.request("lib/server",
      function(response) {
        ping.log("'" + url + "' response", "info", response);
        system.stopwatch("ping " + url, false);
      },
      function(error) {
        ping.log("web.ping failed", "error", error);
        system.stopwatch("ping " + url, false);
      }, "GET", "ping");
    ping.kill();
  }
}