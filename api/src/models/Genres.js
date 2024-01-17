const  {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genres',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
});
};