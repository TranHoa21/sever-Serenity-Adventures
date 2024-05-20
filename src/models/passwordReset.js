const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PasswordReset extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PasswordReset.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    PasswordReset.init({
        email: DataTypes.STRING,
        resetCode: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PasswordReset',
    });
    return PasswordReset;
};
