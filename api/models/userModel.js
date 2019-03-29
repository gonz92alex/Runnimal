var Users = require('../models/mongo/Users');



exports.exists = function(email){
    var promise = Users.findOne({'email': email}).exec();  
    return promise;
}


exports.promiseToUser = function(user){
    var returned
    if (user) returned = {'user':user};
    else returned = undefined;
    return returned;
}