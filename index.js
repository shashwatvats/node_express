const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

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



//express session
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/users', require('./routes/users'));

function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

  
app.use(auth);



//routes for dishes
app.use('/dishes',require('./routes/dishRouter'));
  
//routes for promo
app.use('/promotions',require('./routes/promoRouter'));

//routes for leader
app.use('/leaders',require('./routes/leaderRouter'));
  
const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=>console.log("Server started"));