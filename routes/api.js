var models = require('../lib/models');
var router = require('express').Router();
var async = require('async');

var send_json_response = function(res, err, data) {
  if (err) {
    return res.json({
      err: 401,
      msg: err
    });
  } else {
    if (!data) {
      data = {};
    }
    return res.json(data);
  }
};

// start categories;
router.get('/categories/?', function(req, res) {
  models.Category.find(function(err, categories) {
    categories = categories.map(function(category) {
      return category.toJSON();
    })
    send_json_response(res, err, {categories: categories});
  });
});

router.post('/categories/?', function(req, res) {
  var categoryName = req.body.name;
  async.waterfall([
      function(next) {
        models.Category.findByName(categoryName, function(err, category) {
          if (err) return next();
          return send_json_response(res, null, {category: category.toJSON()});
        });
      },
      function(next) {
        new models.Category({name: categoryName}).save(next);
      }
  ], function(err, category) {
    send_json_response(res, err, {category: category.toJSON()});
  });
});

router.get('/categories/:categoryId/?', function(req, res) {
  models.Category.findById(req.params.categoryId, function(err, category) {
    send_json_response(res, err, {category: category.toJSON()});
  })
});

router.delete('/categories/:categoryId/?', function(req, res) {
  models.Category.findById(req.params.categoryId, function(err, category) {
    if (err) return send_json_response(res);
    category.destory(function(err) {
      send_json_response(res, err);
    });
  })
});
// end categories;

// start configs;
router.get('/configs/?', function(req, res) {
  models.Config.find(function(err, confs) {
    confs = confs.map(function(conf) {
      return conf.toJSON();
    });
    send_json_response(res, err, {configs: confs});
  })
});

router.get('/configs/:key/?', function(req, res) {
  var key = req.params.key;
  Config.get(key, function(err, conf) {
    send_json_response(res, err, {config: conf.toJSON()});
  });
});

router.post('/configs/:key/?', function(req, res) {
  var key = req.params.key;
  var value = req.body.value;
  Config.set(key, value, function(err, conf) {
    send_json_response(res, err, {config: conf.toJSON()});
  });
});
// end configs;

//start user
router.get('/users/?', function(req, res) {
  var qs = req.query;
  var max = Number(qs.max) || Number.MAX_VALUE;
  var limit = Number(qs.limit) || 10;
  if (limit > 100) {
    limit = 100;
  }
  models.User.find({objectId_$lt: max}, {limit: limit}, function(err, users) {
    users = users.map(function(user) {
      return user.toJSON();
    })
    send_json_response(res, err, {users: users});
  });
});
//end user

//start shop
router.get('/shops/?', function(req, res) {
  var qs = req.query;
  var max = Number(qs.max) || Number.MAX_VALUE;
  var limit = Number(qs.limit) || 10;
  if (limit > 100) {
    limit = 100;
  }
  models.Shop.find({objectId_$lt: max}, {limit: limit}, function(err, shops) {
    if (err) return send_json_response(res, err);
    models.Shop.fillObjects(shops, function(err, shops) {
      send_json_response(res, err, {shops: shops});
    });
  });
});
//end shop
module.exports = router;
