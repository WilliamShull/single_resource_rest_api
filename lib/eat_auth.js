var eat = require('eat');
var handleError = require(__dirname + '/errHandler');
var User = require(__dirname + /../models/user);

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || if (req.body) req.body.token;
  if (!encryptedToken) {
    return res.status(401).json({msg: 'Could not authenticate user'});
  }
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) return handlerError(err, res);
    User.findOne({_id: token.id}, function(err, user) {
      if (err) return handlerError(err, res);
      if (!user) return res.status(401).json({msg: 'Could not authenticate user'});
      next();
    });
  });
};
