const User = require("../models/user");
const jwt = require("jsonwebtoken");
const db = require('../models');

const maxAge = 3 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.register = async function(req, res){
    const { username, email, password, confirmation } = req.body;
    if(password === confirmation){
        try{
            const user = await db.User.create({ username, email, password });
            res.status(201).json({ user });
        }
        catch(err){
            res.status(400).json({ err });
        }
    }
    else{
        res.status(400).json({ err: "Confirmation password does not matches" });
    }
}

module.exports.login = async function(req, res){
    const { email, password } = req.body;
    try{
        const user = await db.User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ user, token });
    }
    catch(err){
        console.log(err)
        res.status(400).json({ err });
    }
}