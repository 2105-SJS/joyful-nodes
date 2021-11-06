const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require('./utils');
const { createUser, getUserByUsername, getUserById, getOrdersByUser, getAllUsers, getUser, updateUser } = require("../db");

usersRouter.use((req, res, next) => {
    console.log("A request has been made to /users");
    next();
});

usersRouter.post("/register", async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        if (!username || !password) {
            next({
                name: 'CredentialsError',
                message: 'Username and Password are required'
            });
        }
        const checkUsername = await getUserByUsername(username);
        if (checkUsername) {
            next({
                name: 'UsernameError',
                message: 'Username already exists'
            });
        }
        else if (password.length < 8) {
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
        if (user) {
            const { id, firstName, lastName, username, isAdmin } = user;
            res.send({ message: `Thank you for signing up!!`, token, user: { id, firstName, lastName, username, isAdmin } })
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username.toLowerCase());
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (!username || !password) {
            next({
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

usersRouter.get('/me', async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.headers.authorization;
    try {
        if (!auth) {
            res.sendStatus(401);
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length)
            const { id } = jwt.verify(token, JWT_SECRET);
            req.user = await getUserById(id);
            res.send(req.user)
        }
    } catch (error) {
        next(error);
    };
});

usersRouter.get('/:userId/orders', requireUser, async (req, res, next) => {
    try {
        const { id } = req.user;
        const orders = await getOrdersByUser({ id });
        if (orders) {
            res.send(orders);
        };
    } catch (error) {
        next(error);
    };
});

usersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const users = await getAllUsers();
        if (users) {
            res.send(users);
        };
    } catch (error) {
        next(error);
    };
});

usersRouter.patch("/:userId", requireAdmin, async (req, res, next) => {
    const { userId } = req.params;
    const { firstName, lastName, email, imageURL, username, password, isAdmin } = req.body;
    try {
        const user = await updateUser({ userId, firstName, lastName, email, imageURL, username, password, isAdmin });
        if (user) {
            res.send(user);
        } else {
            next(error);
        }
    } catch (error) {
        next(error);
    };
});


module.exports = usersRouter;