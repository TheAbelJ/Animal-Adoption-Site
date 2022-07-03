/* Requiring Node Modules */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan=require('morgan');
const ejsMate = require("ejs-mate");  /* requiring ejs mate to use layouts */

/* Requiring Functions */
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

/* Requiring Models */
const Animals = require('./models/animals');
const Dogs = require('./models/dogs');
const Cats = require('./models/cats')

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const port=3000;

app.engine('ejs',ejsMate)                                   /* setting ejs engine to be ejsMate */
app.set('view engine', 'ejs');                              /* setting view engine to be ejs */
app.set('views', path.join(__dirname, 'views'))             /* set the views folder */

app.use(express.urlencoded({ extended: true }));            /* used to parse url encoded information from request body */
app.use(methodOverride('_method'));                          /* methodOverride allows to change get/put requests to other types(patch,delete,etc) */
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')));

const userRoute = require("./routes/user");

app.use('/user',userRoute);

app.get('/', (req, res) => {
    res.render('home');
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

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})