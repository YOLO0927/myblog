/**
 * Created by 47166 on 2017/3/1.
 */
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
};