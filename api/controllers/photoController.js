'use strict';
var Users = require('../model/usersModel');
var mkdirp = require('mkdirp');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = 'photos/' + file.fieldname + '/';
        mkdirp(dir, function (err) {
            if (err) {
                console.error(err);
            }
            // move cb to here
            cb(null, dir);
        });
    },
    filename: function (req, file, cb) {
        var ext = file.mimetype.split('/')[1];
        cb(null, req.params.email + '.' + 'png')
        //return res.json({'result':'OK'});
    }
});
var upload = multer({storage:storage});

exports.uploadProfile = function (req, res, next) {
    var email = req.params.email;
    if (!email) return res.status(430).send("Bad request, no email provided");
    email = email.trim();
    Users.getOne(email).then((user) => {
        if (user) {
            var uploadPorfile = upload.single('profile');
            uploadPorfile(req, res, function (err) {
                if (err) return next(err);
                return res.json({'result':'OK'});
            });
        }
        else res.status(404).send("User doesn't exists");
    }).catch(err=>{
        res.status(400).send(err);
    });
}
