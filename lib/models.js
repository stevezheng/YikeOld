'use strict';
var Schema = require('./schema');
var Q = Schema.Q;
var _ = require('underscore');
var async = require('async');

var Category = exports.Category = new Schema('Category', {
  fields: [
    {name: 'name', type: 'str', unique: true}
  ]
});

var Shop = exports.Shop = new Schema('Shop', {
  fields: [
    {name: 'description',  type: 'str'},    // 店铺描述
    {name: 'address',      type: 'str'},    // 店铺地址
    {name: 'area',         type: 'str'},    // 店铺区域
    {name: 'distrinct',    type: 'str'},    // 商圈
    {name: 'userId',       type: 'str'},
    {name: 'phone',        type: 'number'},
    {name: 'name',         type: 'str'},
    {name: 'categoryId',   type: 'str'},
    {name: 'categoryName', type: 'str'},
    {name: 'keywords',     type: 'json'},
    {name: 'title',        type: 'str'},
    {name: 'tel',          type: 'str'},
    {name: 'image',        type: 'str'},
    {name: 'price',        type: 'number'},
    {name: 'sort',         type: 'number'},
    {name: 'comments',     type: 'json'},   // 评论
  ]
});

Shop.fillObjects = function(shops, callback) {
  if (!Array.isArray(shops)) {
    shops = [shops];
  }

  shops = shops.map(function(shop) {
    if (shop.toJSON) {
      return shop.toJSON();
    }
    return shop;
  });

  var ids = shops.map(function(shop) {
    return shop.userId;
  });

  ids = _.compact(_.uniq(ids));
  async.waterfall([
      function(next) {
        User.findByIds(ids, next);
      },
      function(users, next) {
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.Id] = user.toJSON();
        });
        shops = shops.map(function(shop) {
          shops.user = userMap[shop.userId];
          return shop
        });
        next(null, shops);
      }
  ], callback);
};

var ShopComment = exports.ShopComment = new Schema('ShopComment', {
  fields: [
    {name: 'content', type: 'str'},
    {name: 'shopId',  type: 'str', index: true},
    {name: 'userId',  type: 'str'}
  ]
});

ShopComment.fillObjects = function(comments, callback) {
  if (!Array.isArray(comments)) {
    comments = [comments];
  }

  comments = comments.map(function(comment) {
    if (comment.toJSON) {
      return comment.toJSON();
    }
    return comment;
  });

  var ids = comments.map(function(comment) {
    return comment.userId;
  });

  ids = _.compact(_.uniq(ids));
  async.waterfall([
      function(next) {
        User.findByIds(ids, next);
      },
      function(users, next) {
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.Id] = user.toJSON();
        });
        comments = comments.map(function(comment) {
          comments.user = userMap[comment.userId];
          return comment
        });
        next(null, comments);
      }
  ], callback);
};

var Item = exports.Item = new Schema('Item', {
  fields: [
    {name: 'saleName',     type: 'number'}, // 销量
    {name: 'commentStar',  type: 'number'}, // 评分
    {name: 'commentCount', type: 'number'}, // 评分数
    {name: 'comments',     type: 'json'},   // 评价
    {name: 'originPrice',  type: 'number'},
    {name: 'marketPrice',  type: 'number'},
    {name: 'price',        type: 'number'}, // 价格
    {name: 'freight',      type: 'number'}, // 运费
    {name: 'name',         type: 'str'},
    {name: 'shopId',       type: 'str'},
    {name: 'shopName',     type: 'str'},
    {name: 'categoryId',   type: 'str'},
    {name: 'categoryName', type: 'str'},
    {name: 'description',  type: 'str'},    // 商品概述
    {name: 'content',      type: 'str'},    // 商品描述
    {name: 'click',        type: 'number'},
    {name: 'brandId',      type: 'str'},    // 品牌 ID
    {name: 'brandName',    type: 'str'},    // 品牌名称
    {name: 'vat',          type: 'number'}, // 增值税
    {name: 'collect',      type: 'number'}, // 收藏
    {name: 'status',       type: 'number'}, // 状态 0-禁用, 1-正常
    {name: 'storage',      type: 'number'}, // 库存
    {name: 'image',        type: 'str'},    // 默认商品图片
    {name: 'images',       type: 'json'},   // 商品图片
    {name: 'transportId',  type: 'str'},    // 运费模版
  ]
});

var FlashSale = exports.FlashSale = new Schema('FlashSale', {
  fields: [
    {name: 'itemId',  type: 'str'},    // 商品 ID
    {name: 'Item',  type: 'pointer'},    // 商品指针
    {name: 'discountPrice',  type: 'number'},    // 折扣价
    {name: 'limitCount',  type: 'number'},    // 限购
    {name: 'status',  type: 'number'},    // 状态 0-禁用, 1-正常
    {name: 'expireTime',  type: 'date'},    // 过期时间
  ]
});

var CashBack = exports.CashBack = new Schema('CashBack', {
  fields: [
    {name: 'itemId',  type: 'str'},    // 商品 ID
    {name: 'Item',  type: 'pointer'},    // 商品指针
    {name: 'cashBack',  type: 'number'},    // 折扣价
    {name: 'status',  type: 'number'},    // 状态 0-禁用, 1-正常
  ]
});

//抵用券
var Vouchers = exports.Vouchers = new Schema('Vouchers', {
  fields: [
    {name: 'shopId',  type: 'str'},    // 店铺 ID
    {name: 'Shop',  type: 'pointer'},    // 店铺指针
    {name: 'discount',  type: 'number'},    // 抵用金额
    {name: 'condition',  type: 'number'},    // 满足金额
    {name: 'limitCount',  type: 'number'},    // 抵用券数量
    {name: 'expireTime',  type: 'date'},    // 过期时间
    {name: 'count',  type: 'number'},    // 领取人数
    {name: 'status',  type: 'number'},    // 状态 0-禁用, 1-正常
  ]
});

//抵用券订单
var VouchersOrder = exports.VouchersOrder = new Schema('VouchersOrder', {
  fields: [
    {name: 'name',  type: 'str'},    // 标题
    {name: 'shopId',  type: 'str'},    // 店铺 ID
    {name: 'Shop',  type: 'pointer'},    // 店铺指针
    {name: 'VouchersId', type: 'str'}, // 抵用券id
    {name: 'Vouchers', type: 'pointer'}, // 抵用券指针
    {name: 'userId',  type: 'str'},    // 领取人id
    {name: 'User',  type: 'pointer'},    // 领取人指针
    {name: 'activeTime',  type: 'date'},    // 领取时间
    {name: 'status',  type: 'number'},    // 状态 0-过期, 1-正常, 2-已使用
  ]
});

//抢购
var Buying = exports.Buying = new Schema('Buying', {
  fields: [
    {name: 'name',  type: 'str'},    // 标题
    {name: 'itemId',  type: 'str'},    // 产品 ID
    {name: 'content',  type: 'str'},    // 活动详情
    {name: 'Item',  type: 'pointer'},    // 店铺指针
    {name: 'discountPrice',  type: 'number'},    // 抢购价格
    {name: 'limitCount',  type: 'number'},    // 抢购数量
    {name: 'expireTime',  type: 'date'},    // 过期时间
    {name: 'count',  type: 'number'},    // 报名人数
    {name: 'status',  type: 'number'},    // 状态 0-禁用, 1-正常
  ]
});

//抢购订单
var BuyingOrder = exports.BuyingOrder = new Schema('BuyingOrder', {
  fields: [
    {name: 'itemId',  type: 'str'},    // 店铺 ID
    {name: 'Item',  type: 'pointer'},    // 店铺指针
    {name: 'buyingId', type: 'str'}, // 抢购id
    {name: 'Buying', type: 'pointer'}, // 抢购指针
    {name: 'userId',  type: 'str'},    // 领取人id
    {name: 'User',  type: 'pointer'},    // 领取人指针
    {name: 'activeTime',  type: 'date'},    // 领取时间
    {name: 'status',  type: 'number'},    // 状态 0-过期, 1-正常, 2-已使用
  ]
});

Item.fillObjects = function(items, callback) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  items = items.map(function(item) {
    if (item.toJSON) {
      return item.toJSON();
    }
    return item;
  });

  var ids = items.map(function(item) {
    return item.userId;
  });

  ids = _.compact(_.uniq(ids));
  async.waterfall([
      function(next) {
        User.findByIds(ids, next);
      },
      function(users, next) {
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.Id] = user.toJSON();
        });
        items = items.map(function(item) {
          items.user = userMap[item.userId];
          return item
        });
        next(null, items);
      }
  ], callback);
};

var ItemComment = exports.ItemComment = new Schema('ItemComment', {
  fields: [
    {name: 'content', type: 'str'},
    {name: 'itemId',  type: 'str', index: true},
    {name: 'userId',  type: 'str'}
  ]
});

ItemComment.fillObjects = function(comments, callback) {
  if (!Array.isArray(comments)) {
    comments = [comments];
  }

  comments = comments.map(function(comment) {
    if (comment.toJSON) {
      return comment.toJSON();
    }
    return comment;
  });

  var ids = comments.map(function(comment) {
    return comment.userId;
  });

  ids = _.compact(_.uniq(ids));
  async.waterfall([
      function(next) {
        User.findByIds(ids, next);
      },
      function(users, next) {
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.Id] = user.toJSON();
        });
        comments = comments.map(function(comment) {
          comments.user = userMap[comment.userId];
          return comment
        });
        next(null, comments);
      }
  ], callback);
};

var Address = exports.Address = new Schema('Address', {
  fields: [
    {name: 'isDefault', type: 'bool'},   // 是否是默认地址
    {name: 'phone',     type: 'number'}, // 收货人电话
    {name: 'name',      type: 'str'},    // 收货人姓名
    {name: 'province',  type: 'str'},
    {name: 'city',      type: 'str'},
    {name: 'area',      type: 'str'},
    {name: 'address',   type: 'str'},
    {name: 'userId',    type: 'str'},
    {name: 'username',  type: 'str'},
  ]
});


var Order = exports.Order = new Schema('Order', {
  fields: [
    {name: 'userId',           type: 'str'},
    {name: 'cost',             type: 'number'}, // 总额
    {name: 'items',            type: 'json'},   // 商品信息
    {name: 'status',           type: 'number'}, // 订单状态 -2-退货 -1-取消 0-订单创建成,未支付 1-订单已支付 2-订单已消费
    {name: 'payMethod',        type: 'number'}, // 支付方式 0-在线 1-现金
    {name: 'useMethod',        type: 'number'}, // 消费方式 0-到店消费 1-送货上门
    {name: 'voucherId',        type: 'str'},    // 代金券id id为空表示不使用代金券
    {name: 'voucherMoney',     type: 'number'}, // 代金券金额
    {name: 'voucherCondition', type: 'json'},   // 代金券使用条件
    {name: 'address',          type: 'json'},
    {name: 'alipaySN',         type: 'json'},   // 支付宝订单号
    {name: 'wechatSN',         type: 'json'}    // 微信订单号
  ]
});

var Config = exports.Config = new Schema('Config', {
  fields: [
    {name: 'key',   type: 'str', unique: true},
    {name: 'value', type: 'str'}
  ]
});

Config.set = function(key, value, callback) {
  Config.findByKey(key, function(err, conf) {
    if (conf) {
      conf.value = value;
    } else {
      conf = new Config({key: key, value: value});
    }
    conf.save(callback);
  });
};

Config.get = Config.findByKey;

var User = exports.User = new Schema("_User", {
  fields: [
    {name: 'username', type: 'str'},
    {name: 'mobilePhoneNumber', type: 'str'},
  ]
});
