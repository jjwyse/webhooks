exports.index = function (req, res) {
   res.render('index', { title: 'Webhooks' });
};

exports.callback = function(socket) {
   return function(req,res) {
      console.log("Sending webhook JSON to UI");
      socket.emit('webhook', { hello: 'world' });
      res.send('{"success": true}');
   }
}
