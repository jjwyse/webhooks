exports.index = function (req, res) {
   res.render('index', { title: 'Webhooks' });
};

exports.callback = function(socket) {
   return function(req,res) {
      var body = JSON.stringify(req.body);
      var headers = JSON.stringify(req.headers);
      var webhookJson = {};
      webhookJson['body'] = body;
      webhookJson['headers'] = headers;
      console.log(webhookJson);
      console.log("Sending webhook to UI");
      socket.emit('webhook', webhookJson);
      res.end();
   }
}
