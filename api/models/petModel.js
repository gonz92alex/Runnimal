var pets = require('../db/Pets');


exports.exists = function(email){
    pets.findOne({'email': email})
        .exec((err, result) => {
            if(err) return {'error':err};
            if (result) return {'pets':result};
            return undefined;
    });  
}