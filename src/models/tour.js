const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Tour.init({
        places_name: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        link: DataTypes.STRING,
        price: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Tour',
    });
    return Tour;
};
