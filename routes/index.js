exports.index = function (req, res) {
   res.render('index', { title: 'Webhooks' });
};

exports.callback = function(socket) {
   return function(req,res) {
      var json = JSON.stringify(req.body);
      console.log("Sending webhook JSON to UI: " + json);
      socket.emit('webhook', json);
      res.end();
   }
}
