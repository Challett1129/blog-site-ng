//Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Create associations

//User can have many post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Post can only have one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

//User hasMany Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//Post hasMany Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };