const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//Initialise Express 
const app = express();

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/NodeExpressDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

//express session
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth (req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');                        
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session: ',req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
}

  
  app.use(auth);


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes for dishes
app.use('/dishes',require('./routes/dishRouter'));
  
//routes for promo
app.use('/promotions',require('./routes/promoRouter'));

//routes for leader
app.use('/leaders',require('./routes/leaderRouter'));
  
const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=>console.log("Server started"));