const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup(req, res) {
    try{
    // Get the email and password from the req body
    const {email, password} = req.body;

    //Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create an user with the data
    await User.create({email, password: hashedPassword});

    // Respond with it
    res.sendStatus(200);    // 200 - success status
    } catch(err){
        console.log(err);
        res.sendStatus(400);    // 400 - error status
    }
}

function login(req, res) {
    try{
    // Get the email and password of the request body
    const {email, password} = req.body;

    // Find the user with the requested email
    const user = User.findOne({email});

    //user not found then return 401 status - unauthorized access status
    if(!user) return res.sendStatus(401);

    // compare sent in password with found user hashed password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    //if password not matched then send unauthorized access status
    if(!passwordMatch) return res.sendStatus(401);

    // Create a jwt token
    const expiration_time = Date.now() + 1000 * 60 * 60 * 24 * 30; // expiration_time - 30 days, 1000 - 1000 milli seconds = 1 second
    const token = jwt.sign({sub: user._id, exp:expiration_time}, process.env.SECRET);

    //set the cookie
    res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    // send it
    res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

function logout(req, res) {
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

function checkAuth(req, res) {
    try{
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};