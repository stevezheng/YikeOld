var router = require('express').Router();
var D = require('yi-lean-orm');
var AV = require('leanengine');

router.post('/del', function(req, res, next) {
  var id = req.param('id');
  //var query = new AV.Query(AV.User);
  //query.equalTo('objectId', id);
  //query.find({
  //  success: function(user) {
  //    user = user[0];
  //    console.log(user);
  //    console.log(user.destroy);
  //    user.destroy({
  //      success: function(data) {
  //        console.log('删除成功');
  //        console.log(data);
  //        res.json({'result': '删除成功'});
  //      },
  //      error: function(user, err) {
  //        console.log('删除失败');
  //        console.log(err);
  //        res.json({'result': '删除失败'});
  //      }
  //    })
  //  }
  //})
  D('User')
    .where({objectId: id})
    .delete()
    .then(function() {
      res.json({'result': '删除成功'});
    })
});

router.post('/money', function(req, res, next) {
  var id = req.param('id')
    , money = req.param('money');
  D('User')
    .where({objectId: id})
    .update({money: money})
    .then(function() {
      res.json({'data': '修改成功'})
    }, function(data, err) {
      res.status(500).json({'data': '修改失败'})
    });
})

module.exports = router;