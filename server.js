import dotenv from 'dotenv';
import express from 'express';
import ejsMate from 'ejs-mate';
import path from 'path';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // create a MongoDB store for express session data rather than using the memory by default
import methodOverride from 'method-override';
import connectDB from './config/mongodb.js';
import User from './models/user.js';
import ExpressError from './utilities/ExpressError.js';
import userRoutes from './routes/usersRoutes.js';
import recipesRoutes from './routes/recipesRoutes.js';
import reviewRoutes from './routes/reviewsRoutes.js';

dotenv.config();
connectDB(); // connect to mongoDB

const app = express();

// set up ejs template engine
const __dirname = path.dirname(new URL(import.meta.url).pathname); // __dirname is not defined in ES module scope
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs')

// parse req.body
app.use(express.urlencoded({ extended: true }));

// serve static assets folder. Then link the stylesheets to corresponding folder location
app.use(express.static(path.join(__dirname + '/public')));

// configure method-override
app.use(methodOverride('_method'));

// set up session
// create a session store for session data
// configure cookie
const secret = process.env.SECRET;
app.use(session({
    name: 'scid', // name our own session ID cookie instead of using default
    secret,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        secret,
        touchAfter: 24 * 60 * 60 // touch the file in this amount of seconds if no changes to the content and no need to resave. 
    }),
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires after 7 days from now
        maxAge: 60000
    }
}))

app.use(flash());

// set up passport, passport-local. 
// session must be set up first
app.use(passport.initialize()); // 'passport.initializer()' middleware is required to initialize passport in an Express-based app
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) // 'serialization' tells how to store the data in a session
passport.deserializeUser(User.deserializeUser()) // 'deserialization' tells how to un-store the data in a session


app.use((req, res, next) => {
    res.locals.currentUser = req.user //'req.user' automatically added by passport when user login
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})

// homepage
app.get('/', (req, res) => {
    res.render('home');
})

// routes
app.use('/recipes/:id/reviews', reviewRoutes);
app.use('/recipes', recipesRoutes);
app.use('/', userRoutes);


// error handler
// Order matters - code below will only run if the request doesn't match any of the route above
// app.all means for every request no matter it's get, post, put, or delete
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404)); // using class 'ExpressError' to create a new object and pass it into next. Express will know it's an error and pass it to the error handling middleware function

})

// set up our basic error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('errors', { err }) // render the errors.ejs
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})