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
    if (err) return send_json_response(res, err);
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
    models.Shop.fillObjects(shop, function(err, shop) {
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
    models.ShopComment.fillObjects(comment, function(err, comment) {
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

// start shop item
router.get('/shops/:shopId/items/?', function(req, res) {
  var shopId = req.params.shopId;
  var qs = req.query;
  var max = Number(qs.max) || Number.MAX_VALUE;
  var limit = Number(qs.limit) || 10;
  if (limit > 100) {
    limit = 100;
  }
  models.Item.find({objectId_$lt: max, shopId: shopId}, {limit: limit}, function(err, items) {
    if (err) return send_json_response(res, err);
    models.Item.fillObjects(items, function(err, items) {
      send_json_response(res, err, {items: items});
    });
  });
});

router.post('/shops/:shopId/items/?', require_login(), function(req, res) {
  var data = req.body;
  var shopId = req.params.shopId;
  var item = new models.Item(data);
  item.shopId = shopId;
  item.save(function(err, item) {
    send_json_response(res, err, {item: item.toJSON()});
  });
});

router.get('/shops/:shopId/items/:itemId/?', function(req, res) {
  var itemId = req.params.itemId;
  models.Item.findById(itemId, function(err, item) {
    models.Item.fillObjects(item, function(err, item) {
      send_json_response(res, err, {item: item[0]});
    });
  });
});

router.post('/shops/:shopId/items/:itemId/?', require_login(), function(req, res) {
  var data = req.body;
  var itemId = req.params.itemId;
  models.Item.findById(itemId, function(err, item) {
    item = _.extend(item, data);
    item.save(function(err, item) {
      send_json_response(res, err, {item: item.toJSON()});
    });
  });
});
// end shop item

// start item comment
router.get('/shops/:shopId/items/:itemId/comments/?', function(req, res) {
  var itemId = req.params.itemId;
  var qs = req.query;
  var max = Number(qs.max) || Number.MAX_VALUE;
  var limit = Number(qs.limit) || 10;
  if (limit > 100) {
    limit = 100;
  }
  models.ItemComment.find({objectId_$lt: max, itemId: itemId}, {limit: limit}, function(err, comments) {
    if (err) return send_json_response(res, err);
    models.ItemComment.fillObjects(comments, function(err, comments) {
      send_json_response(res, err, {comments: comments});
    });
  });
});

router.post('/shops/:shopId/items/:itemId/comments/?', require_login(), function(req, res) {
  var data = req.body;
  var itemId = req.params.itemId;
  var comment = new models.ItemComment(data);
  comment.itemId = itemId;
  comment.save(function(err, comment) {
    send_json_response(res, err, {comment: comment.toJSON()});
  });
});

router.get('/shops/:shopId/items/:itemId/comments/:commentId/?', function(req, res) {
  var commentId = req.params.commentId;
  models.ItemComment.findById(commentId, function(err, comment) {
    models.ItemComment.fillObjects(comment, function(err, comment) {
      send_json_response(res, err, {comment: comment[0]});
    });
  });
});

router.post('/shops/:shopId/items/:itemId/comments/:commentId/?', require_login(), function(req, res) {
  var data = req.body;
  var commentId = req.params.commentId;
  models.ItemComment.findById(commentId, function(err, comment) {
    comment = _.extend(comment, data);
    comment.save(function(err, comment) {
      send_json_response(res, err, {comment: comment.toJSON()});
    });
  });
});
// end item comment

// start address
router.get('/addrs/?', require_login(), function(req, res) {
  var userId = req.user.userId;
  models.Address.find({userId: userId}, function(err, addrs) {
    addrs = addrs.map(function(addr) {
      return addr.toJSON();
    })
    send_json_response(res, err, {addrs: addrs});
  });
});

router.post('/addrs/?', require_login(), function(req, res) {
  var userId = req.user.userId;
  var data = req.body;
  var addr = new models.Address(data);
  addr.userId = userId;
  addr.save(function(err, addr) {
    send_json_response(res, err, {addr: addr.toJSON()});
  });
});

router.get('/addrs/:addrId/?', require_login(), function(req, res) {
  models.Address.findById(req.params.addrId, function(err, addr) {
    if (addr.userId !== req.user.id && !req.admin) {
      return res.send(400, 'Permission denied!');
    }
    send_json_response(res, err, {addr: addr.toJSON()});
  })
});

router.delete('/addrs/:addrId/?', require_login(), function(req, res) {
  models.Address.findById(req.params.addrId, function(err, addr) {
    if (err) return send_json_response(res, err);
    if (addr.userId !== req.user.id && !req.admin) {
      return res.send(400, 'Permission denied!');
    }
    addr.destory(function(err) {
      send_json_response(res, err);
    });
  })
});
// end address
module.exports = router;
