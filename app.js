const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan=require('morgan');
const ejsMate=require("ejs-mate");
const Animals = require('./models/animals');

/* mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); */

/* const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}); */

const app = express();

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req, res) => {
    res.render('home');
});

app.use((req,res)=>{
    res.status(404).send('NOT FOUND');
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})