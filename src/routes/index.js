const { Router } = require('express');
const axios = require('axios');
const createGenres = require('../controllers/createGenres');
const createVideogame = require('../controllers/createVideogame');
const findAllGenres = require('../controllers/findAllGenres');
const findAllVideogame = require('../controllers/findAllVideogame');
const findVideogameById = require('../controllers/findVideogameById');
const findVideogameByName = require('../controllers/findVideogameByName');
const deleteVideogame = require('../controllers/deleteVideogame');

const router = Router();

// Rutas
router.get('/Videogame', async (req, res) => {
  try {
    const videogame = await findAllVideogame();
    res.status(200).json(videogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/Videogame/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Intentar buscar en la base de datos
      const videogameFromDB = await findVideogameById(id);
  
      if (videogameFromDB) {
        // Si se encuentra en la base de datos, devolverlo
        res.status(200).json(videogameFromDB);
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
        res.status(200).json(videogame);
      }
    } catch (error) {
      console.error("Error handling GET /Videogame/:id", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });

router.get('/Videogame/name', async (req, res) => {
  try {
    const { name } = req.query;
    const videogame = await findVideogameByName(name);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/videogame', async (req, res) => {
  try {
    const { Name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, Genres } = req.body;
    const newVideogame = await createVideogame(
      Name,
      Descripcion,
      Plataformas,
      Imagen,
      FechaLanzamiento,
      Rating,
      Genres
    );
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/genres', async (req, res) => {
  try {
    const genres = await findAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
