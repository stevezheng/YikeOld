'use strict';
var Schema = require('./schema');
var Q = Schema.Q;
var underscore = require('underscore');
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

var User = exports.User = new Schema("User", {
  fields: [

  ]
});
