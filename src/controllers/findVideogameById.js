
const axios = require('axios');
const { Genres } = require('../db');

const findVideogameById = async (id) => {
    try {
      // Intentar buscar en la base de datos
      const videogameFromDB = await Genres.findByPk(id); // Ajusta según la estructura de tu modelo
  
      if (videogameFromDB) {
        // Si se encuentra en la base de datos, devolverlo
        console.log("Videojuego encontrado en la base de datos:", videogameFromDB);
        return videogameFromDB;
      } else {
        // Si no se encuentra en la base de datos, buscar en la API
        const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
          params: {
            key: process.env.RAWG_API_KEY,
          },
        });
  
        // Obtener la información relevante del response de la API
        const apiVideogame = response.data; // Ajusta según la estructura de la respuesta
  
        // Crear objeto con los datos relevantes
        const videogame = {
          id: apiVideogame.id,
          name: apiVideogame.name,
          // Otros campos que desees incluir
        };
  
        // Devolver el videojuego encontrado en la API
        console.log("Videojuego encontrado en la API:", videogame);
        return videogame;
      }
    } catch (error) {
      console.error("Error en findVideogameById:", error);
      throw error;
    }
  };
  module.exports = findVideogameById;
