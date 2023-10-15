
const HttpError = require("../models/http-error")
const uuid = require("uuid").v4;


const {validationResult}= require ("express-validator")

let USER_DUMMY=[

    {
       id:"u1",
        name:"Gabi",
        email:"gabyiy2000@yahoo.com",
        password:"test",
    
}
]


const getUsers = (req,res,next)=>{

    res.json({USER_DUMMY})
}

const getUserById = (req,res,next)=>{

const userId =req.params.uid;

const user = USER_DUMMY.find(u=> u.id === userId)

if(!user || user.length===0){

    return next (new HttpError("Could not find eny user with that id"),404)
}
res.json({message: user})
}


const createUser = (req,res,next)=>{
const {name}= req.body;

const error = validationResult(req)

if (!error.isEmpty()){
    throw new HttpError("You must enter a name")
}

const createUser ={
    id:uuid(),
    name:name
   
}
USER_DUMMY.push(createUser)

res.status(200).json(createUser);
}

const updateUser = (req,res,next)=>{
const {name}= req.body

const error = validationResult(req)

if (!error.isEmpty()){
    throw new HttpError("You must enter a name")
}


const userId =req.params.uid;
const updatedUser ={... USER_DUMMY.find(u=> u.id===userId)};

const userIndex = USER_DUMMY.findIndex(u=> u.id === userId)

updatedUser.name = name;


USER_DUMMY[userIndex]= updatedUser
res.status(200).json({user :updatedUser});

}

const deleteUser=(req,res,next)=>{
if (!USER_DUMMY.filter(u=>u.id ===req.params.uid)){

    throw new HttpError("Could not find a place with that id",404)
}

USER_DUMMY= USER_DUMMY.filter(u=>u.id !== req.params.uid)

res.status(200).json({message:"User deleted"})
}

const signup = (req,res,next)=>{

    const error = validationResult(req)

if (!error.isEmpty()){
    throw new HttpError("Your dident enter all credentials needed")
}


    const {name,email,password} =req.body;
const existingEmail =  USER_DUMMY.find(u=> u.email === email)
if (existingEmail){
    throw new HttpError ("User exist")
}

const createdUser ={
    id:uuid(),
    name:name,
    email:email,
    password:password
}

USER_DUMMY.push(createUser)

res.status(200).json({user : createdUser})
}

const login = (req,res,next)=>{
 
    const {email,password}= req.body

   const identifiedUser= USER_DUMMY.find(u=> u.email===email);

if(!identifiedUser || identifiedUser.password!==password){

throw   new HttpError("Could not identify user ,credentials seem to be wrong.",401) ;
}

res.status(200).json({message: "You r  credentials are corect"})
}

exports.getUsers=getUsers;
exports.getUserById=getUserById;
exports.createUser =createUser;
exports.updateUser= updateUser;
exports.deleteUser= deleteUser;
exports.signup=signup

exports.login=login