var models = require('../lib/models');
var router = require('express').Router();
var async = require('async');
var require_login = require('../lib/utils').require_login;
var require_admin = require('../lib/utils').require_admin;
var require_role = require('../lib/utils').require_role;
var _ = require('underscore');

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

router.post('/categories/?', require_admin(), function(req, res) {
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

router.delete('/categories/:categoryId/?', require_admin(), function(req, res) {
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

router.post('/configs/:key/?', require_admin(), function(req, res) {
  var key = req.params.key;
  var value = req.body.value;
  Config.set(key, value, function(err, conf) {
    send_json_response(res, err, {config: conf.toJSON()});
  });
});
// end configs;

//start user
router.get('/users/?', require_admin(), function(req, res) {
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

router.post('/shops/?', require_admin(), function(req, res) {
  var data = req.body;
  var shop = new models.Shop(data);
  shop.save(function(err, shop) {
    send_json_response(res, err, {shop: shop.toJSON()});
  });
});

router.get('/shops/:shopId/?', function(req, res) {
  var shopId = req.params.shopId;
  models.Shop.findById(shopId, function(err, shop) {
    models.fillObjects(shop, function(err, shop) {
      send_json_response(res, err, {shop: shop[0]});
    });
  });
});

router.post('/shops/:shopId/?', require_admin(), function(req, res) {
  var data = req.body;
  var shopId = req.params.shopId;
  models.Shop.findById(shopId, function(err, shop) {
    shop = _.extend(shop, data);
    shop.save(function(err, shop) {
      send_json_response(res, err, {shop: shop.toJSON()});
    });
  });
});
//end shop

// start shop comment
router.get('/shops/:shopId/comments/?', function(req, res) {
  var shopId = req.params.shopId;
  var qs = req.query;
  var max = Number(qs.max) || Number.MAX_VALUE;
  var limit = Number(qs.limit) || 10;
  if (limit > 100) {
    limit = 100;
  }
  models.ShopComment.find({objectId_$lt: max, shopId: shopId}, {limit: limit}, function(err, comments) {
    if (err) return send_json_response(res, err);
    models.ShopComment.fillObjects(comments, function(err, comments) {
      send_json_response(res, err, {comments: comments});
    });
  });
});

router.post('/shops/:shopId/comments/?', require_login(), function(req, res) {
  var data = req.body;
  var shopId = req.params.shopId;
  var comment = new models.ShopComment(data);
  comment.shopId = shopId;
  comment.save(function(err, comment) {
    send_json_response(res, err, {comment: comment.toJSON()});
  });
});

router.get('/shops/:shopId/comments/:commentId/?', function(req, res) {
  var commentId = req.params.commentId;
  models.ShopComment.findById(commentId, function(err, comment) {
    models.fillObjects(comment, function(err, comment) {
      send_json_response(res, err, {comment: comment[0]});
    });
  });
});

router.post('/shops/:shopId/comments/:commentId/?', require_login(), function(req, res) {
  var data = req.body;
  var commentId = req.params.commentId;
  models.ShopComment.findById(commentId, function(err, comment) {
    comment = _.extend(comment, data);
    comment.save(function(err, comment) {
      send_json_response(res, err, {comment: comment.toJSON()});
    });
  });
});
// end shop comment
module.exports = router;
