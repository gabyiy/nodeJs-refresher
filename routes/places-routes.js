const express = require("express");
//importam cotrolerele

//importam express validator din care destructuram sascoatem check method

const {check}= require("express-validator")

const placesControlers = require("../controllers/places-controller");

//accesam metoda router
const router = express.Router();
//folosim router pentru a exporta rutele

//creem o ruta dinamica (pid o sa fie introdus dupa adresa in browser)
//Este o functie middleware 
router.get("/:pid",placesControlers.getPlaceById);

router.get("/user/:uId",placesControlers.getPlacesByUserId);

//aici folosim midelware check , si ii trecem ca parametru ce dorim sa verificam (pentru a nu fi gol , etc) ,facand chain la metode 
router.post("/",[check("title").not().isEmpty(),check("description").not().isEmpty().isLength({min:5}),check("address").not().isEmpty()],placesControlers.createPlace);

//se pot utiliza aceleasi nume de rute atata timp cat nu folosesc aceasi metoda get post ...
router.patch("/:pid",[check("title").not().isEmpty(),check("description").not().isEmpty().isLength({min:5})],placesControlers.updatePlace);

router.delete("/:pid",placesControlers.deletePlace);




//aici exportam tot ce este legat de router si poate fi accesat in app
module.exports= router;