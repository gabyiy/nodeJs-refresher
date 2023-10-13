const express = require("express");
const bodyParser = require("body-parser");

//importam rutele
const placeRoutes = require("./routes/users-routes");

const app = express();

//si acum putem folosi ruta
app.use(placeRoutes);



app.listen(5000);

//cu rauting vrem sa scultam diferite http combinati  la anumite functi care ar trebui sa fie executate candavem acele requests