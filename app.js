const express = require("express");
const app = new express();
const cors = require("cors");
const { PORT } = require("./config");
const path = require("path");
const fs = require("fs");
const postgres = require("./src/modules/postgres");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(async (req, res, next) => {
    const psql = postgres();
    req.psql = psql;
    next();
})

app.listen(PORT, console.log("Server ready..."));

fs.readdir(path.join(__dirname, "src", "routes"), (err, files) => {
    if(!err){
        files.forEach(file => {
            const routePath = path.join(__dirname, "src", "routes", file);
            const Route = require(routePath);

            if(Route.path && Route.router) app.use(Route.path, Route.router);
        })
    }
})