const express = require("express");
const server = express();
const createGenres = require("./controllers/createGenres");
const createVideogame = require("./controllers/createVideogame");
const findAllGenres = require("./controllers/findAllGenres");
const findAllVideogame = require("./controllers/findAllVideogame");
const findVideogameById = require("./controllers/findVideogameById");
//const { Genres, videogame} = require ("./db");

const Videogame = require("./models/Videogame");
server.use(express.json());

server.get("/Videogame", async(req, res) => {
    const {status} = req.query;
    try{
    const Videogame = status 
    ? await findAllVideogame({status})
    : await findAllVideogame();
    //console.log("GET request body:", req.body);
    res.status(200).json(Videogame);
    }catch (error){
        //console.error("Error handling GET /Videogame:", error);
    res.status(400).json({error: error.message});
    }
});

server.get("/Videogame/:id", async(req, res )=>{
    try{
    const {id} = req.params;
    const Videogame = await findVideogameById(id);
    console.log("GET request body:", req.body)
    res.status(200).json(Videogame);
    } catch (error){
        console.error("Error handling GET /Videogame/id", error);
    res.status(400).json({error: error.message});
    }

});

server.post("/Videogame", async (req, res) => {
    try{
const { Name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, Genres} = req.body;
//console.log("POST request body:", req.body);// Agrega esta línea para imprimir el cuerpo de la solicitud
const newVideogame = await createVideogame(
    Name,
    Descripcion,
    Plataformas,
    Imagen,
    FechaLanzamiento,
    Rating,
    Genres,
);
console.log("POST /Videogame successful:", newVideogame);
res.status(200).json(newVideogame);
    }catch (error){
        //console.error("Error handling POST /Videogame:", error);
    res.status(400).json({error: error.message});
    
    }
});

server.get("/Genres", async (req, res) => {
    try {
        const Genres = await findAllGenres();
        res.status(200).json(Genres);
    } catch (error) {
        console.error('Error find all Genres:', error);
        res.status(500).json({ error: error.message });
        
    }
});

server.post("/Genres", async (req, res) => {
    try {
        const { Name } = req.body;
        const newGenres = await createGenres(Name);
        res.status(201).json(newGenres);
    } catch (error) {
        console.error('Error creating Genres:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = server;
