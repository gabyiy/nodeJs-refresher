const express = require("express");
const bodyParser = require("body-parser");

//importam rutele
const placeRoutes = require("./routes/places-routes");
const usersRoutes= require("./routes/users-routes");

const HttpError = require("./models/http-error")

const app = express();

// pentru a extrage json data si a o transforma in javaqscript  obj sau array
app.use(bodyParser.json());

//si acum putem folosi ruta
app.use("/api/places",placeRoutes);
app.use("/api/users",usersRoutes)

// folosim midelweru asta nu gasim ruta
app.use((req,res,next)=>{

   return next( new HttpError("Could not find this route",404))
    
})

//Special middleware function (o functie error handling)it only execute if we have in front of it a middleware function that have an error in it ,ele se utilizeazea doar cand avem o erroare atasata 
app.use ((error,req,res,next)=>{
//verificam daca da trimis headeru
if(res.headerSent){
    return next(error);
}
//daca nu stim ca nu sa primit nici un raspuns si trimite statusul ( in care developerul poate seta erroarea)
//si spunem daca userul a introdus o erroare altfel sa ne arate o errore 500
res.status(error.code || 500)
res.json({message: error.message || "An unknow error ocurred"})

})

app.listen(5000);

//cu rauting vrem sa scultam diferite http combinati  la anumite functi care ar trebui sa fie executate candavem acele requests