exports.verifyUser = async(req, res, next) => {
    // check if the user is logged in or not
    if(!req.user){
        res.redirect('/auth/login');
    }

    next();
}