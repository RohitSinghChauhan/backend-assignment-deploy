const { Router } = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/users.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const userPresent = await UserModel.findOne({ email })
    if (userPresent?.email) {
        res.send({ 'msg': 'user already exists' });
    }
    else {
        try {
            bcrypt.hash(password, 8, async function (err, hash) {
                await UserModel.create({ email, password: hash });
                res.send({ 'msg': 'user signed up successfully' });
            })
        }
        catch (err) {
            console.log(err);
            res.send({ 'err': 'something went wrong' });
        }
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user?.email) {
            const hashed_password = user.password;

            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
                    res.send({ 'msg': 'user has logged in', 'token': token });
                }
                else {
                    res.send({ 'err': 'wrong password' });
                }
            })
        }
        else {
            res.send({ 'err': 'wrong email' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }

});

module.exports = userRoute;