const { listenerCount } = require('./userModel');
var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    var result = null;
    try {
        result = await userService.createUserDBService(req.body);
        if (result.status) {
            res.send({ "status": false, "message": "Error al crear un usuario" });
        } else {
            res.send({ "status": true, "message": "Usuario creado" });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

const searchUserFunc = async (req, res) => {
    let response = null;

    try {
        response = await userService.searchUser( req.body ); //aqui manda el objeto del postman

        if ( response.status ) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

const updateUserFunc = async (req, res) => {
    let response = null;

    try {
        response = await userService.updateUser( req.body ); //aqui manda el objeto del postman

        if ( response.status ) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

const deleteUserFunc = async (req, res) => {
    let response = null;

    try {
        response = await userService.deleteUser( req.body ); //aqui manda el objeto del postman

        if ( response.status ) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserFunc, deleteUserFunc, updateUserFunc};