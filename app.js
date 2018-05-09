const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

//Load Models
require('./models/users');
require('./models/Story');

//Passport Config
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Load Keys
const keys = require('./config/keys');

//Handlebars Helpers
const {
    truncate,
    stripTags,
    formatDate
} = require('./helpers/hbs');

//Map Global Promises
mongoose.Promise = global.Promise
//Mongoose Connect
mongoose.connect(keys.mongoURI)
    .then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 3000 

app.listen(port, () => {
    console.log(`server started on ${port}`)
})