const express = require("express");

const server = express();
const { Videogame } = require("./db");

server.get("/videogame", (req, res) =>{
    res.send("información sobre todos los videojuegos");
});
//server.post("/api/src/models/Videogame.js", (req, res) =>{

//});
//server.get("/api/src/models/Genres.js", () =>{
   // const Genres = Genres.findAll()
//});
module.exports = server;