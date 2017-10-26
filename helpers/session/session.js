var app = require('express')();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'foo', //change this later
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
        url: process.env.MLAB_URI, //replace with database url from env file
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default
    }),
    // cookie: {secure:true} Uncomment in production
}));

