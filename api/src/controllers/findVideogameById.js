const {Videogame, Genres} = require ("../db")

const findVideogameById = async(id) =>{
    const videogame = await Videogame.findByPk(id,{
    include:{
        model: Genres,
        attributes: ["Name"], 
        through:{
            attributes:[],
        },
    },

    });

    if (!Videogame) throw Error ( "Videogame no existe" );
    return videogame;
}

module.exports = findVideogameById;