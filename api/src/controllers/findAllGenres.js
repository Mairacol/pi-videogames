const {Genres} = require ("../db");

const findAllGenres = async () =>{
    try{
    const genres = await Genres.findAll();
    return genres;
    } catch (error){
           // Manejo de errores
           console.error("Error al buscar géneros:", error);
           throw error; // Puedes elegir manejar el error de otra manera si es necesario
    }
 };

 module.exports = findAllGenres;
