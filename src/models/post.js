const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.belongsToMany(models.User, { through: 'PostLikes', as: 'likedBy' });
        }
    }
    Post.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        image: DataTypes.STRING,
        like: DataTypes.INTEGER,
        comment: DataTypes.INTEGER,
        author: DataTypes.STRING,
        link: DataTypes.STRING,
        description: DataTypes.STRING,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        publicationDate: DataTypes.DATE,
        Public: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
