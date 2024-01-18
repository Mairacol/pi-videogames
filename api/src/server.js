const express = require("express");
const server = express();
const createGenres = require("./controllers/createGenres");
const createVideogame = require("./controllers/createVideogame");
const findAllGenres = require("./controllers/findAllGenres");
const { Genres} = require ("./db");
server.use(express.json());

server.get("/Videogame", (req, res) => {
    res.send("Información sobre todos los videojuegos");
});

server.post("/Videogame", async (req, res) => {
    try{
const { Name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating} = req.body;
console.log("POST request body:", req.body);// Agrega esta línea para imprimir el cuerpo de la solicitud
const newVideogame = await createVideogame(
    Name,
    Descripcion,
    Plataformas,
    Imagen,
    FechaLanzamiento,
    Rating,
);
console.log("POST /Videogame successful:", newVideogame);
res.status(200).json(newVideogame);
    }catch (error){
        console.error("Error handling POST /Videogame:", error);
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
