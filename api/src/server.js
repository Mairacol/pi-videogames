const express = require("express");
const server = express();
const createGenres = require("./controllers/createGenres");
const findAllGenres = require("./controllers/findAllGenres");
const { Genres} = require ("./db");
server.use(express.json());

server.get("/videogames", (req, res) => {
    res.send("Información sobre todos los videojuegos");
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
