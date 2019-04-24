exports.photos = function () {
    
    return {upload: multer({ storage: storage })}
};