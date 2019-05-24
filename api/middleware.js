var TokenDao = require('./models/tokensDao');

function loginMiddleware(req, res, next){
    console.log('En el middleware');
    var token = req.headers.token;
    console.log(req.path)
    if (!token) return res.status(401).send('No token provided');
    else{
        token = token.trim();
        TokenDao.getUser(token).then(token=>{
            console.log(token);
            if (token){
                req.user = token.user;
            }
            else{
                res.status(403).send('No user find');
            }
        }).catch(err=>{

        });
    }
    next();
}


module.exports = loginMiddleware;