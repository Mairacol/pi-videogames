const {Videogame} = require("../db");

const createVideogame = async(Name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, Genres) => {
    const newVideogame = await Videogame.create({
        Name, 
        Descripcion, 
        Plataformas, 
        Imagen, 
        FechaLanzamiento, 
        Rating,
        Genres
    });

    newVideogame.addGenres(Genres);
    
    console.log("Videogame created successfully:", newVideogame);
    return newVideogame;

};

module.exports = createVideogame;