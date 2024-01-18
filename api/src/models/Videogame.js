const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('Videogame', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100] // Longitud entre 1 y 100 caracteres
      },
    },
    Descripcion:{
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000] // Longitud máxima de 1000 caracteres
      },
    },
    Plataformas:{
      type: DataTypes.STRING,
    },
    Imagen:{
      type: DataTypes.STRING,
    },
    FechaLanzamiento:{
      type: DataTypes.DATE,
      validate: {
        isDate: true // Asegura que la fecha esté en formato válido
      },
    },
    Rating:{
      type: DataTypes.DECIMAL,
    },
  });
    // Método estático create, esto es agregado 
    Videogame.createVideogame = async (name) => {
      const newVideogame = await Videogame.create({ Name: name });
      return newVideogame;
    };
    return Videogame;
};
