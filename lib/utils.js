var User = require('./models').User;

exports.require_login = function() {
  return function(req, res, next) {
    if (req.AV.user) {
      req.user = new User(req.AV.user);
      if (req.user.role === 'admin') {
        req.admin = true;
      }
      return next();
    }
    res.send(403, 'Permission denied!');
  }
};

exports.require_admin = function() {
  return exports.require_role('admin');
};

exports.require_role = function(role) {
  return function(req, res, next) {
    if (req.AV.user) {
      req.user = new User(req.AV.user);
      if (req.user.role === role) {
        if (req.user.role === 'admin') {
          req.admin = true;
        }
        return next();
      }
    }
    res.send(403, 'Permission denied!');
  }
};
