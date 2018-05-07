const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

const app = express();

//Load Routes
const auth = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('It Works!')
})

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server started on ${port}`)
})