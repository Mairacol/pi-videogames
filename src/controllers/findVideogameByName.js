// En el archivo controllers/findVideogameByName.js
const axios = require('axios');  // Agregamos la importación de axios para realizar solicitudes HTTP
const { Genres } = require('../db');

const findVideogameByName = async (name) => {
  try {
    console.log("Searching for videogames with name:", name);

    // Realizamos la solicitud a la API de RAWG.io
    const response = await axios.get(process.env.RAWG_API_BASE_URL, {
      params: {
        key: process.env.RAWG_API_KEY,
        search: name,
      },
    });

    // Extraemos los resultados de la respuesta
    const gamesFromApi = response.data.results;

    // Mapeamos los resultados para adaptarlos al formato de salida
    const slicedVideogames = gamesFromApi.slice(0, 15).map((game) => {
      return {
        Name: game.name,
        Descripcion: game.description || "",  // Puedes ajustar según la disponibilidad de datos
        Plataformas: game.platforms.join(', ') || "",  // Asumimos que la API devuelve una lista de plataformas
        Imagen: game.background_image || "",  // Ajustar según la disponibilidad de datos
        FechaLanzamiento: game.released || "",  // Ajustar según la disponibilidad de datos
        Rating: game.rating || 0,  // Ajustar según la disponibilidad de datos
        Genres: [],  // Asumimos que no hay información de géneros directamente en la búsqueda por nombre
      };
    });

    console.log("Found videogames:", slicedVideogames);

    return slicedVideogames;
  } catch (error) {
    console.error("Error en findVideogameByName:", error);
    throw error;
  }
};

module.exports = findVideogameByName;
