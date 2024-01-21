const express = require("express");
const server = express();
const createGenres = require("./controllers/createGenres");
const createVideogame = require("./controllers/createVideogame");
const findAllGenres = require("./controllers/findAllGenres");
const findAllVideogame = require("./controllers/findAllVideogame");
const findVideogameById = require("./controllers/findVideogameById");
const findVideogameByName = require("./controllers/findVideogameByName");
const deleteVideogame = require("./controllers/deleteVideogame");
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
server.get("/Videogame/name", async (req, res) => {
    try {
      const { name } = req.query;
  
      if (!name) {
        //console.error("Error: El parámetro 'name' es obligatorio en la query.");
        return res.status(400).json({ error: "El parámetro 'name' es obligatorio en la query." });
      }
      //console.log("Searching for videogames with name:", name);
      const videogame = await findVideogameByName(name);
  
      if (videogame.length === 0) {
        //console.log("No se encontraron videojuegos con el nombre proporcionado.");
        return res.status(404).json({ message: "No se encontraron videojuegos con el nombre proporcionado." });
      }
      
      //console.log("GET request body:", req.body);
      res.status(200).json(videogame.slice(0, 15)); // Limitamos a 15 resultados
    } catch (error) {
      //console.error("Error handling GET /videogames/name", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });
  
server.get("/Videogame/:id", async(req, res )=>{
    try{
    const {id} = req.params;
    const Videogame = await findVideogameById(id);
    //console.log("GET request body:", req.body)
    res.status(200).json(Videogame);
    } catch (error){
        //console.error("Error handling GET /Videogame/id", error);
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
        //console.error('Error find all Genres:', error);
        res.status(500).json({ error: error.message });
        
    }
});

server.post("/Genres", async (req, res) => {
    try {
        const { Name } = req.body;
        const newGenres = await createGenres(Name);
        res.status(201).json(newGenres);
    } catch (error) {
        //console.error('Error creating Genres:', error);
        res.status(400).json({ error: error.message });
    }
});

server.delete("/Videogame/:id",(req, res )=>{
    const {id} = req.params;
try{
const  deletedVideogame = deleteVideogame(id);
res.status(200).json(deletedVideogame);
}catch (error){
    res.status(400).json({ error: error.message });
}
});

module.exports = server;
