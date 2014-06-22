exports.index = function (req, res) {
   res.render('index', { title: 'Webhooks' });
};

exports.callback = function(req,res) {
   console.log("Handling callback");
   res.send('{"success": true}');
}
