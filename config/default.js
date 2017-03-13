/**
 * Created by 47166 on 2017/3/1.
 */
module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: '2592000000'
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}