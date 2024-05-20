const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function requireAuth(req, res, next) {
    try{
    // Read token of the cookies
    const token = req.cookies.Authorization;

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRECT);

    // Check expiration
    if(Date.now() > decoded.exp) return res.sendStatus(401);

    // Find user using decoded token
    const user = await User.findById(decoded.sub);

    //if user is not found then return 401 status response - unauthorized access status
    if(!user) return res.sendStatus(401);

    // attach user to req
    req.user = user;

    //continue on
    next();
    } catch(err){
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;