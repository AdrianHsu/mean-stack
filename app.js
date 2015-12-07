var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

var uri = 'mongodb://' + process.env.MONGOLAB_USERNAME + ':' + process.env.MONGOLAB_PASSWORD + '@ds061974.mongolab.com:61974/adrianhsu_mongodb';
// mongoose.connect('mongodb://localhost/bookstore');
mongoose.connect(uri);
var db = mongoose.connection;

app.get('/', function(req, res) {
	res.send("Please use /api/books or /api/genres");
});

app.get('/api/books', function(req, res) {
	Book.getBooks(function(err, books) {
		if(err) {
			throw err;
		}
		res.json(books);
	});
});
app.post('/api/books', function(req, res) {
	var book = req.body;
	Book.addBook(book, function(err, book) {
		if(err) {
			throw err;
		}
		res.json(book);
	});
});
app.get('/api/books/:_id', function(req, res) {
	Book.getBookById(req.params._id, function(err, book) {
		if(err) {
			throw err;
		}
		res.json(book);
	});
});
app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});
// app.get('/api/genres', function(req, res) {
// 	Genre.getGenres(function(err, genres) {
// 		if(err) {
// 			throw err;
// 		}
// 		res.json(genres);
// 	});
// });
// app.get('/api/genres/:_id', function(req, res) {
// 	Genre.getGenreById(req.params._id, function(err, genre) {
// 		if(err) {
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });
// app.post('/api/genres', function(req, res){
// 	var genre = req.body;
// 	Genre.addGenre(genre, function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });

// app.put('/api/genres/:_id', function(req, res){
// 	var id = req.params._id;
// 	var genre = req.body;
// 	Genre.updateGenre(id, genre, {}, function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });

// app.delete('/api/genres/:_id', function(req, res){
// 	var id = req.params._id;
// 	var genre = req.body;
// 	Genre.removeGenre(id, function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });
