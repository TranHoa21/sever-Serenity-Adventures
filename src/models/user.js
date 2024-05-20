const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.BOOLEAN,
        avatar: DataTypes.STRING,
        phonenumber: DataTypes.INTEGER,
        age: DataTypes.STRING,
        gender: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
