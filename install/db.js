module.exports = {
  Shop: {
    description: '' //店铺描述
    , address: '双流县高新区老成仁路姐儿艳站苏南竹岛酒店楼下'
    , city: '成都'
    , area: '高新区'
    , circle: '中和' //商圈
    , phone: '18650019932'
    , name: '川西坝子南码头火锅店'
    , categoryId: '559a156ae4b0001a92d9433a'
    , categoryName: '美食'
    , keywords: ['好吃', '便宜', '服务态度好']
    , title: ''
    , tel: '028-99653653'
    , image: ''
    , price: 0
    , sort: 255
    , comments: '' //评价
  },
  Item: {
    saleNum: 0 //销量
    , commentStar: 5 //评分
    , commentCount: 0 //评论数
    , comments: '' //评价
    , originPrice: 0
    , marketPrice: 0
    , price: 199 //价格
    , freight: 0 //运费
    , name: '测试商品'
    , shopId: '559bb388e4b023682f13d0f9'
    , shopName: '测试店铺'
    , categoryId: '559a156ae4b0001a92d9433a'
    , categoryName: '美食'
    , description: '美食就是好好吃' //商品概述
    , content: '正文'  //商品描述
    , click: 0
    , brandId: '' //品牌id
    , brandName: '' //品牌名称
    , vat: 0 //增值税
    , collect: 0 //收藏
    , status: 1 //状态 0-禁用，1-正常
    , storage: 0 //库存
    , image: 'http://ac-ry3vkr5q.clouddn.com/0hURloywo0W7Kls4dizIW8voMwzFTsOPm0PoQxtj.jpg' //默认商品图片
    , images: ['http://ac-ry3vkr5q.clouddn.com/0hURloywo0W7Kls4dizIW8voMwzFTsOPm0PoQxtj.jpg',
      'http://ac-ry3vkr5q.clouddn.com/0hURloywo0W7Kls4dizIW8voMwzFTsOPm0PoQxtj.jpg'] //商品图片
    , transportId: '' // 运费模板
  },
  Address: {
    isDefault: 0 //是否是默认地址
    , phone: '18650171234' //收货电话
    , name: '收货人' //收货人姓名
    , province: '四川'
    , city: '成都'
    , area: '高新区'
    , address: '详细地址'
    , userId: ''
    , username: ''
  },
  Order: {
    userId: ''
    , cost: 19.36 //总额
    , items: [{"itemId":"559e5282e4b023682f3e42f9",
      "itemName":"双人套餐，免费WiFi",
      "itemPrice":19,
      "shopId":"559e5280e4b023682f3e42ad",
      "shopName":"台北台北鲜虾馆"}] //商品信息
    , status: 0 //订单状态 -2-退货 -1-取消 0-订单创建成,未支付 1-订单已支付 2-订单已消费
    , payMethod: 0 //支付方式 0-在线 1-现金
    , useMethod: 0 //消费方式 0-到店消费 1-送货上门
    , voucherId: '' //代金券id id为空表示不使用代金券
    , voucherMoney: 0 //代金券金额
    , voucherCondition: {need: '100', to: 'dec', money: '10'} //代金券使用条件
    , address: {name: '收货人', phone: '18650124456', province: '四川', city: '成都', area: '高新区', address: '美年广场'}
    , alipaySN: '' //支付宝订单号
    , wechatSN: '' //微信订单号
  }
};