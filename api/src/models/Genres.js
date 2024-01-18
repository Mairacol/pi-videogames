const  {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const Genres = sequelize.define('Genres',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
});

  // Método estático create, esto es agregado 
  Genres.createGenres = async (name) => {
    const newGenres = await Genres.create({ Name: name });
    return newGenres;
  };

  return Genres;
};