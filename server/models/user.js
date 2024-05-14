const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes){
    const User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        birthday:{
            type: DataTypes.DATE,
                allowNull: true,
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    User.beforeCreate(async function(user, options){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
    });

    User.login = async function (email, password) {
        const user = await this.findOne({ where: {email} });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
          throw Error("Incorrect password");
        }
        throw Error("Incorrect email");
    };

    return User;
}