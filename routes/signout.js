/**
 * Created by 47166 on 2017/3/1.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//  GET /signup 登出
router.get('/', checkLogin, function(req, res, next) {
  // 清空 session 中的用户信息
  req.session.user = null
  req.flash('success', '登出成功');
  // 登出成功后跳转到主页
  res.redirect('/posts');
});


module.exports = router;