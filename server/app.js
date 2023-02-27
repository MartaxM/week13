var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// mongoose settings
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
//mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

// cors settings


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/api", router);
const Book = require("./models/Book");
app.post('/api/book', (req, res) => {
    Book.create(
        {
            name: req.body.name,
            author: req.body.author,
            pages: Number(req.body.pages)
        }, (err, ok) => {
            if (err) throw err;
            return res.sendStatus(200);
        }
    );
})

app.get('/api/book/:id', (req, res, next) => {
    Book.findOne({ name: req.params.id }, (err, book) => {
        if (err) throw err;
        if (book) {
            res.json(book.toJSON());
        }
    })
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("/*", (req, res) =>
        res.sendFile(path.resolve("..", "client", "build", "index.html"))
    );

} else if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

}

module.exports = app;