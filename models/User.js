const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
  
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
} 

User.init(
    {
    //id for user
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    //name of user
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    //user's email with the built-in isEmail validation to prevent non-emails from being entered
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    //user's password must be a string of at least six characters 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[4]
        }
    },
},
{
    hooks: {
      //hashes passwords on user creation
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //hashes new password on user update
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
)

module.exports = User;