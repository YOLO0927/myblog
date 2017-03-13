/**
 * Created by 47166 on 2017/3/1.
 */
// req.session为express-session中间件内的api，
// 用于通过cookie携带的id或重写uri携带的id简单的查找请求服务器中的session
// req.flash为connect-flash插件，也是express的一个中间件，是基于session实现的用于通知功能的中间件
module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if(!req.session.user){
      req.flash('error', '未登录');
      return res.redirect('/signin')
    }
    next();
  },
  checkNotLogin: function checkNotLogin(req, res, next) {
    if(req.session.user){
      req.flash('error', '已登录');
      return res.redirect('back');  // 返回之前的页面
    }
    next();
  }
};