//import sequelize objects
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js')

//create comment model
class Comment extends Model{}

//define comment model
Comment.init(
    {
      //column for comment ID
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      //text must have a length of at least 1, 
      comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      //references user table to associate the ID's when a user comments
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      //references post table to associate the ID's when a user comments
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );
  
  module.exports = Comment;