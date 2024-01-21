// En el archivo controllers/findVideogamesByName.js
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db");

const findVideogameByName = async (name) => {
  try {
    console.log("Searching for videogames with name:", name);
    const videogame = await Videogame.findAll({
      where: {
        Name: {
          [Op.iLike]: `%${name}%`, // Utilizamos Op.iLike para búsqueda insensible a mayúsculas y minúsculas
        },
      },
      include: {
        model: Genres,
        attributes: ["Name"],
        through: {
          attributes: [],
        },
      },
    });

    const slicedVideogames = videogame.slice(0, 15).map((game) => game.toJSON());

    console.log("Found videogames:", slicedVideogames);

    return slicedVideogames;
  } catch (error) {
    console.error("Error en findVideogameByName:", error);
    throw error;
  }
};

module.exports = findVideogameByName;