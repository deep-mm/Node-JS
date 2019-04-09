module.exports = function(req,res,next) {
    if(req.params.age === 'GET') {
        res.end('GET method not supported');
    } else {
        next();
    }
};