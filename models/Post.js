const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js')


class Post extends Model{}

Post.init(
    {
        //gives post an id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //gives post a title that cannot be null
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //body of text for the post 
        text_body: {
            type: DataTypes.TEXT, 
            allowNull: false
        },
        //connects the relative user id to this table
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
      }
)


module.exports = Post;