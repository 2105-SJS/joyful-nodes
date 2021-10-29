const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const { JWT_SECRET } = process.env;
const { createUser, getUser, getUserByUsername } = require("../db");

usersRouter.use((req, res, next) => {
    console.log("A request has been made to /users");
    next();
});

usersRouter.post("/register", async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        if(!username || !password){
            next({
                name: 'CredentialsError',
                message: 'Username and Password are required'
              });
        }
        const checkUsername = await getUserByUsername(username);
        if(checkUsername){
            next({
                name: 'UsernameError',
                message: 'Username already exists'
              });
        }
        else if(password.length < 8){
            next({
                name: 'PasswordError',
                message: 'Password cannot be less than 8 characters'
              });
        }
        const user = await createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username.toLowerCase(),
            password: password
        });
        res.send({
            user: user
        });
    }
    catch (error) {
        next(error);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        console.log(user)
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (!username || !password) {
            next ({
                name: 'MissingCredentialsError',
                message: 'Please supply both a username and password'
            });
        };
        if (user && passwordsMatch) {
            const token = jwt.sign(user, JWT_SECRET);
            const { id, firstName, lastName, username, isAdmin } = user;
            res.send({ message: `You're logged in!`, token, user: { id, firstName, lastName, username, isAdmin } });
        } else {
            res.status(401);
            next({
                name: 'CredentialsError',
                message: 'Invalid credentials'
              });
        };
    } catch (error) {
        next(error);
    };
});

usersRouter.get("/me", async (req, res, next) => {
    try {
        if(req.auth){
            res.send(req.auth);
        }
        else{
            next('User not found');
        }
    }
    catch (error) {
        next(error);
    }
});


module.exports = usersRouter;