const { Videogame, Genres } = require("../db");
const axios = require('axios');

const findAllVideogame = async (query) => {
    try {
        // Obtener videojuegos de la base de datos
        const videogamesFromDB = await Videogame.findAll({
            where: query,
            include: {
                model: Genres,
                attributes: ["Name"],
                through: {
                    attributes: [],
                },
            },
        });

        // Consultar API para obtener videojuegos adicionales
        const response = await axios.get('https://api.rawg.io/api/games', {
            params: {
                key: process.env.RAWG_API_KEY,
            },
        });

        // Verificar si 'results' existe en la respuesta
        const apiVideogames = response.data.results ? response.data.results.map(apiVideogame => ({
            id_personalizado: generateCustomId(),
            nombre: apiVideogame.name,
            descripcion: apiVideogame.description,
            plataformas: apiVideogame.platforms.map(plataforma => plataforma.platform.name), // Modificación aquí
            imagen: apiVideogame.background_image,
            fechaLanzamiento: apiVideogame.released,
            rating: apiVideogame.rating,
        })) : [];

        // Combinar y devolver videojuegos de la base de datos y de la API
        const allVideogames = [...videogamesFromDB, ...apiVideogames];

        console.log("All video games:", allVideogames);

        return allVideogames;
    } catch (error) {
        console.error("Error en findAllVideogame:", error);
        throw error;
    }
};

// Función para generar un ID personalizado (puedes ajustarla según tus necesidades)
function generateCustomId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = findAllVideogame;
