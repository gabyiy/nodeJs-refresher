//importam clasa error
const HttpError =  require ("../models/http-error");
//instalam uuid pentru a genera iduri
const uuid = require("uuid").v4;

//si aici importam o metoda de la validator 

const {validationResult}= require("express-validator")


let DUMMY_PLACES=[

    {
       
        id:"p1",
        title:"Empire State Building",
        description :"One of the most famous sky scrapers in the world",
        location :{
            lat:40.7484474,
            lng:-73.9871516
        },
        adress:"20 W 34th St , New York,NY 10001",
        creator:"u1"
    }
    ];



const getPlaceById= (req ,res,next)=>{
        //extragem id cu pramas
        const placeId = req.params.pid //asa acesam parametru care il avem in ruta dinamica
    
        const places = DUMMY_PLACES.find(p=>{ //aici facem un fel de map si vedem daca avem un p.id care se aseamana cu ce primim prin parametru
        return p.id ===placeId; 
        });//nu ajuta sa gasim ce cautam in placeId
    
        //daca nu avem niciun place trimitem erroare
        //folosim return pentru a nu ffi nevoie sa folosim if else
        if(!places || places.length===0){
         //ii trimitem eroroare prin clasa instantiata
          //folism next cand suntem intru asyncron middleware 
        return  next ( new HttpError("Could not find a places for the provided id"),404);
        }
        res.json({places});
    
    }

    const getPlacesByUserId = (req,res,next)=>{

        const userId = req.params.uId;
        
        const place = DUMMY_PLACES.filter(u=>{
            return u.creator === userId;
        })
    
        if (!place){
       ;
          //cand suntem intrun  syncron middleware folosim throw
          throw new HttpError("Could not find a creator with that id ");
        }
        res.json({place});
        }


        const createPlace =(req,res,next)=>{
            //si asa activam validator ca sa putem primi errori
        const errors=  validationResult(req)
if(!errors.isEmpty()){
    throw new HttpError("Invalid inputs passed,pleqase check your data",422)
}
            //facem un destruct la ce primim si le salvam in var
            const {title,description,coordinates,address ,creator} = req.body;

            //si aici salvam in obiect tot ce primim de la body

            const createdPlace={
                id: uuid(),
                title:title,
                description:description,
                location:coordinates,
                address:address,
                creator:creator

            }
            DUMMY_PLACES.push(createdPlace);
            //daca totu a mers bine trimitem statusu si facem un return la createdPlace

            res.status(201).json(createdPlace)
        }


        const updatePlace =(req, res,next)=>{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                throw new HttpError("Invalid inputs passed, please check your data",422)
            }
            const {title,description}= req.body;
            const placeId = req.params.pid;

            //folosim spread operator pentru a face o copie
            const updatePlace ={...DUMMY_PLACES.find(p=>p.id===placeId)}

            const placeIndex = DUMMY_PLACES.findIndex(p=> p.id===placeId)
            //iar aici updatam ce primim de la user
            updatePlace.title=title;
            updatePlace.description=description

            //iar asa updatam vechiul obiect dumy cu noul obiect updatePlaces
       DUMMY_PLACES[placeIndex]=updatePlace;
        
            res.status(200).json({place : updatePlace})
        }


        const deletePlace =(req,res,next)=>{

            //creem iar o copie si spunem practic sa stearga toate datele mai putin cele care au id respectiv
           DUMMY_PLACES=DUMMY_PLACES.filter(p=> p.id !== req.params.pid)

          res.status(200).json({message: "Deleted place"})

        }
//le exportam si dupe le utilizam in routes
        exports.getPlaceById= getPlaceById;
        exports.getPlacesByUserId=getPlacesByUserId;
        exports.createPlace =createPlace;
        exports.updatePlace=updatePlace;
        exports.deletePlace=deletePlace;
