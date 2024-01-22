CREATE TABLE Videogames (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Plataformas VARCHAR(255) NOT NULL,
    Imagen VARCHAR(255),
    FechaLanzamiento DATE,
    Rating FLOAT
);
CREATE TABLE Genres (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL
);
CREATE TABLE VideogameGenres (
    VideogameID INTEGER REFERENCES Videogames(ID),
    GenreID INTEGER REFERENCES Genres(ID),
    PRIMARY KEY (VideogameID, GenreID)
);
