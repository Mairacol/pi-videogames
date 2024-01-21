const {Videogame} = require ("../db");

const deleteVideogame = async(id) =>{
    const videogame = await Videogame.findByPk(id);
    await videogame.destroy();
    return Videogame;
};

module.exports = deleteVideogame;