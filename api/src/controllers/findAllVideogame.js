const {Videogame, Genres} = require("../db");

const findAllVideogame = async (query) =>{
        const videogames = await Videogame.findAll({
            where: query,
            
            include: {
                model: Genres,
                attributes: ["Name"], 
                through:{
                    attributes:[],
                },
            },
        });
        return videogames;
};
module.exports = findAllVideogame;