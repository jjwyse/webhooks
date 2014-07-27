exports.index = function (req, res) {
   res.render('index', { title: 'Webhooks' });
};

exports.callback = function(socket) {
   return function(req,res) {
      console.log("Sending webhook JSON to UI: " + req.body);
      socket.emit('webhook', req.body);
      res.send('{"success": true}');
   }
}
