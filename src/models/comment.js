const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Comment.init({
        post_id: DataTypes.INTEGER,
        comment_text: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        user_name: DataTypes.STRING,
        user_avatar: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
