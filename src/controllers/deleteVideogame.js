const { Videogame } = require("../db");

const deleteVideogame = async (id) => {
    try {
        // Buscar el videojuego en la base de datos
        const videogame = await Videogame.findByPk(id);

        // Verificar si el videojuego existe
        if (!videogame) {
            console.log("Videojuego no encontrado en la base de datos");
            return { error: "Videogame no encontrado" };
        }

        // Eliminar el videojuego
        await videogame.destroy();

        console.log("Videojuego eliminado correctamente");
        return { message: "Videogame eliminado correctamente" };
    } catch (error) {
        console.error("Error en deleteVideogame:", error);
        throw error;
    }
};

module.exports = deleteVideogame;
