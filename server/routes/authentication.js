
function authenticate(email){
    if (email.length>10){
        return true;
    }
    else{
        return false;
    }
}

module.exports.authenticate = authenticate;
