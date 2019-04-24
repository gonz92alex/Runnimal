'use strict';

var mongoose = require('mongoose').set('debug',true);
var Users = require('../db/Users');

exports.list = function(req,res) {
    Users.find().exec((err,users) => {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
};

exports.newUser = function(req,res) {
    var alias = req.body.alias;
    var email = req.body.email;
    var password = req.body.password;
    if (!alias) return res.status(400).send("Bad request, no alias provided");
    if (!email) return res.status(400).send("Bad request, no email provided");
    if (!password) return res.status(400).send("Bad request, no password provided");
    
    alias = alias.trim();
    email = email.trim();
    password = password.trim();

    //console.log(alias+', '+email+', '+password)
    Users.findOne({'email': email})
        .exec((err, result) => {
            if (result) {
                return res.status(400).send("Pet already exists");
            }
            else {
                var usr = new Users({
                    alias: alias,
                    email: email,
                    password: password
                });
                usr.save(function(err) {
                    return res.json(usr);
                });
            }
        });        
};

exports.editUser = function(req,res){
    //Aquí irían los atributos de user a editar, de momento sólo podremos cambiar el alias.
    var email = req.params.email; 
    var alias = req.body.alias.trim(); 
    if(!email) return res.status(432).send("Bad request, no email provided");



    //A partir de aquí habría que desacoplar en otra capa. 
    Users.findOne({'email': email}).exec((err,user) => {
            if (user){ 
                user.alias = alias; 
                user.save(function(err){
                    return res.json(user);
                })
            }
            else {
                res.status(404).send("User " + email + " not found.");
            };
    });
};

exports.getOne = function(req,res) {
    var email = req.params.email;
    if (!email) return res.status(432).send("Bad request, no email provided");
    
    email = email.trim();
    Users.findOne({'email': email}).exec((err,user) => {
        if (err)
            res.send(err);
        else
            res.json(user);
    });
};

exports.getOneById = function(req, res){
    var id = req.params.id;

    if (!id) return res.status(400).send("Bad request, no id provided");

    Users.findById(id, function(err, user){
        if(err) return res.status(400).send(err);
        return res.send(user);
    });
}

exports.deleteOne = function(req,res) {
    var email = req.params.email;
    if (!email) return res.status(432).send("Bad request, no email provided");
    
    email = email.trim();
    Users.findOne({'email': email}).exec((err,user) => {
        if (err)
            res.send(err);
        else
            Users.remove({_id:user._id}, function(err){
                if (!err) res.send('{"result":"OK"}');
                else res.send('{"result":"KO"}');
            });
    });
};