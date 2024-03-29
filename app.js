//Project created by Abel John

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan=require('morgan');
const ejsMate = require("ejs-mate");  /* requiring ejs mate to use layouts */
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const LocalStrategy = require('passport-local');


/* Requiring Functions */
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

/* Requiring Models */
const Pet = require('./models/pets');
const User = require('./models/users');
const Shelter = require('./models/shelters')
const {species} = require('./seeds/petbreeds')
const dbUrl = process.env.DB_URL;
//process.env.DB_URL;
//'mongodb://127.0.0.1:27017/petRescue'
mongoose.connect(dbUrl, {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs',ejsMate)                                   /* setting ejs engine to be ejsMate */
app.set('view engine', 'ejs');                              /* setting view engine to be ejs */
app.set('views', path.join(__dirname, 'views'))             /* set the views folder */
app.use(mongoSanitize());                                   //Sanitize incoming data i.e prevent mongo injections
app.use(express.urlencoded({ extended: true }));            /* used to parse url encoded information from request body */
app.use(methodOverride('_method'));                          /* methodOverride allows to change get/put requests to other types(patch,delete,etc) */
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')));       /* Setting the public directory for static assets */

const secret = process.env.SECRET || 'testbug';
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());                            //should be called after session
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    if(!['/user/login','/','/home','/user/register'].includes(req.originalUrl)){
        req.session.returnTo = req.originalUrl;
    }
    next();
})


const userRoute = require("./routes/users");
const petRoute = require("./routes/pets")
app.use('/user',userRoute);
app.use('/pet',petRoute)

app.get(['/','/home'], (req, res) => {
    res.render('home',{species});
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err, req, res, next) => {
    console.log(err.name);
    /* We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err) */
    next(err);
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})