const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Load User Model
require('./models/users');

//Passport Config
require('./config/passport')(passport);

const app = express();

//Load Routes
const auth = require('./routes/auth');

//Load Keys
const keys = require('./config/keys');

//Map Global Promises
mongoose.Promise = global.Promise
//Mongoose Connect
mongoose.connect(keys.mongoURI)
    .then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('It Works!')
})

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 3000 

app.listen(port, () => {
    console.log(`server started on ${port}`)
})