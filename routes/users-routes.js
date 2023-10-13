const express = require("express");

//accesam metoda router
const router = express.Router();

//folosim router pentru a exporta rutele

router.get("/",(req ,res,next)=>{

    console.log("It works");

    res.json({message: "It works"});

});


//aici exportam tot ce este legat de router si poate fi accesat in app
module.exports= router;