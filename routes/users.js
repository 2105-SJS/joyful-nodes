const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
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
            username: username,
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

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password){
        next({
            name: 'CredentialsError',
            message: 'Username and Password are required'
          });
    }
    try {
        const user = getUser({ username, password });
        if(user){
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
            res.send({ message: "You have succesfully logged in!", token: token });
        }
        else{
            next({
                name: 'CredentialsError',
                message: 'Invalid credentials'
              });
        }
    }
    catch (error) {
        next(error);
    }
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