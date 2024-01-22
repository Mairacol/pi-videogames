const { Videogame, Genres } = require("../db");

const createVideogame = async (Name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, GenresNames) => {
  try {
    // Buscar o crear géneros y obtener sus IDs
    const genreIds = await Promise.all(GenresNames.map(async (genreName) => {
        let genre = await Genres.findOrCreate({
          where: { Name: String(genreName) }, // Convertir a cadena
          defaults: { Name: String(genreName) }, // Convertir a cadena
        });
        return genre[0].id;
      }));
      

    // Crear el videojuego en la base de datos
    const newVideogame = await Videogame.create({
      Name,
      Descripcion,
      Plataformas,
      Imagen,
      FechaLanzamiento,
      Rating,
      Genres,
    });

    // Asociar géneros al videojuego
    await newVideogame.addGenres(genreIds);

    console.log("Videogame created successfully:", newVideogame);
    
    // Devolver solo los datos relevantes del videojuego creado
    const response = {
      id: newVideogame.id,
      Name: newVideogame.Name,
      // Otros campos que desees incluir
    };

    return response;
  } catch (error) {
    console.error("Error in createVideogame:", error);
    throw error;
  }
};

module.exports = createVideogame;
