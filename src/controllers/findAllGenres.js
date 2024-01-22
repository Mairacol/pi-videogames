const axios = require('axios');
const { Genres } = require('../db');

const findAllGenres = async () => {
  try {
    // Obtener géneros de la base de datos
    const genresFromDB = await Genres.findAll();

    // Obtener géneros de la API
    const response = await axios.get('https://api.rawg.io/api/genres', {
      params: {
        key: process.env.RAWG_API_KEY,
      },
    });

    const genresFromAPI = response.data.results.map(apiGenre => ({
      id: apiGenre.id, // Agrega el id
      Name: apiGenre.name,
    }));

    // Combinar y devolver géneros de la base de datos y de la API
    const allGenres = [...genresFromDB, ...genresFromAPI];

    return allGenres;
  } catch (error) {
    console.error("Error en findAllGenres:", error);
    throw error;
  }
};

module.exports = findAllGenres;
