//clasa in javascript  este un bluprint pentru un obiect

class HttpError extends Error{

    constructor (message,errorCode){
//Folosim super pentru a acesa constructoru clasei la care facem extends (Error) si ii trimite mai departe mesaju
        super(message)//Add a message property
        this.code = errorCode; //Adds a code property to the istances of this class
    }

}

module.exports =HttpError;