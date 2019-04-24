'use strict';

var multer  = require('multer')
var upload = multer({ dest: 'photos/' })

var Users = require('../models/userModel');
var Pets = require('../models/petModel');
var Photos = require('../models/photoModel');




exports.uploadUser = function(req,res) {
    var email = req.params.email;
    if (!email) return res.status(432).send("Bad request, no email provided");
    email = email.trim();
    let user = Users.exists(email).then(function(user){
        return Users.promiseToUser(user);
    })
    .catch(err=>{
        return {'error': err}
    });
    if (user == undefined )  res.status(432).send("User doesn't exist");
    if ('user' in user){
        console.log(req.body);
        console.log(req.file);
        //let photo = req.files.file;
        //await Photos.savePhoto(photo, user._id)
    }
    else{
        res.status(432).send("User doesn't exist");
    }
};

    
exports.uploadPet = function(req,res) {
    var owner = req.params.owner;
    var name = req.params.name;
    if (!owner) return res.status(432).send("Bad request, no owner provided");
    if (!name) return res.status(432).send("Bad request, no name provided");
    owner = owner.trim();
    name = name.trim();
    var pet = Pets.exists(owner, name);
    if ('pet' in pet){
        let photo = req.files.file;
        photo.mv('./photos/'+pet._id,err => {
            if(err) return res.status(500).send({ message : err })
            return res.status(200).send({ message : 'File upload' })
        })
    }
    else{
        res.status(432).send("Pet doesn't exist");
    }
};

    
exports.getUser = function(req,res) {

};


    
exports.getPet = function(req,res) {

};