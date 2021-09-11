import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // create a MongoDB store for express session data rather than using the memory by default

import connectDB from './config/mongodb.js';
import loginScreen from './views/users/login.js';
import registerScreen from './views/users/register.js';
import homeScreen from './views/home.js';
import User from './models/users.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true })); // parse req.body

// set up passport
app.use(passport.initialize()); // 'passport.initializer()' middleware is required to initialize passport in an Express-based app
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) // 'serialization' tells how to store the data in a session
passport.deserializeUser(User.deserializeUser()) // 'deserialization' tells how to un-store the data in a session

// create session
// create a session store for session data
// configure cookie
const secret = process.env.SECRET;
app.use(session({
    secret,
    saveUninitialized: true, // don't create session until something stored
    resave: false, // don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        // secret,
        touchAfter: 24 * 60 * 60 // touch the file in this amount of seconds if no changes to the content and no need to resave. 
    }),
    cookie: {
        name: 'SCID', // name our own session ID cookie instead of using default
        httpOnly: true,
        maxAge: 60000
    }
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// homepage
app.get('/', (req, res) => {
    res.send(homeScreen());
})

// render register page
app.get('/register', async (req, res) => {
    res.send(registerScreen());
})

// register user
// 'register(user, password, cb)' is a statics method added by password-local-mongoose.
// It helps to register a new user instance by hashed a given password and also check if username is unique.
// It also saves data to Mongo automatically.

app.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, password, confirmPassword } = req.body;
        const user = new User({ username, email });
        if (password === confirmPassword) {
            const registerUser = await User.register(user, password)
            req.login(registerUser, err => {
                req.flash('success', 'register successfully');
                res.redirect('/');
            })
        } else {
            req.flash('error', 'Password do not match. Please try again.')
            res.redirect('/register');
        }

    } catch (err) {
        console.log(err);
    }
})

// render login page
app.get('/login', (req, res) => {
    res.send(loginScreen());
})

// log user in
// passport.authenticate() is a passport built-in middleware, which compares the password entered with the stored one and login the user if the data matches
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Login successfully');
    res.redirect('/');
    console.log(success);
})



app.listen(3000, () => {
    console.log('listening on port 3000');
})