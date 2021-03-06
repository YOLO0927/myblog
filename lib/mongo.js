/**
 * Created by 47166 on 2017/3/7.
 */
var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 create_at,mongodb自动生成的_id前4个字节（即前8个字符）为精确到秒的16进制时间戳，
// 转为10进制后的result然后new Date(result*1000)即为创建此条数据的时间
mongolass.plugin('addCreateAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});
// 用户模型
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
// 文章模型
exports.Post = mongolass.model('Post', {
  author: {type: Mongolass.Types.ObjectId},
  title: {type: 'string'},
  content: {type: 'string'},
  pv: {type: 'number'}
});
// 评论模型
exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
  postId: { type: Mongolass.Types.ObjectId }
});
exports.User.index({ name: 1 }, { unique:true }).exec();  // 根据用户名找到用户，用户名全局唯一
exports.Post.index({ author: 1, _id: -1 }).exec();  // 按创建时间降序查看用户的文章列表
exports.Comment.index({ postId: 1, _id: 1 }).exec();  // 通过文章id获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();  // 通过用户id和留言id删除一个留言