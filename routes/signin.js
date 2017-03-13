/**
 * Created by 47166 on 2017/3/1.
 */
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//  GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin');
});

//  POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  var password = req.fields.password;

  UserModel.getUserByName(name).then(function (user) {
    // 检测用户名
    if (!name) {
      req.flash('error', '用户名不存在');
      return res.redirect('back');
    }
    // 检测密码是否匹配
    if(sha1(password) !== user.password) {
      req.flash('error', '用户名或密码错误');
      return res.redirect('back')
    }
    // 若用户名与密码检测都通过
    req.flash('success', '登录成功');
    // 用户信息写入session
    delete user.password;
    req.session.user = user;
    // 跳转回主页
    res.redirect('/posts')
  }).catch(next);
});

module.exports = router;