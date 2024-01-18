//const {Episode} = require ("../db");
const {Genres} = require("../db");

const createGenres = async(Name) =>  {
    const newGenres = await Genres.create({ Name });
    return newGenres;
}; 
module.exports = createGenres;