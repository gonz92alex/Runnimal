//var fileupload = require("express-fileupload");


exports.savePhoto = function(photo, name){
    photo.mv('./photos/'+name,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    })

}