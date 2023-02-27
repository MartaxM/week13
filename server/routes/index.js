var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/api/book', (req, res) => {
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

router.get('/api/book/:id', (req, res, next) => {
  Book.findOne({ name:req.params.id }, (err, book) => {
    if (err) throw err;
    if (book) {
      res.json(book.toJSON());
    }
  })
});