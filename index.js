const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
//Initialise Express 
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/NodeExpressDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});




//initialize passport
app.use(passport.initialize());

app.use('/users', require('./routes/users'));

app.use('/imageUpload',require('./routes/uploadRouter'));

//routes for dishes
app.use('/dishes',require('./routes/dishRouter'));

//routes for favorite
app.use('/favorite',require('./routes/favoriteRouter'));
  
//routes for promo
app.use('/promotions',require('./routes/promoRouter'));

//routes for leader
app.use('/leaders',require('./routes/leaderRouter'));
  
const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=>console.log("Server started"));