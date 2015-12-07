var mongoose = require('mongoose');

//Book Schema
var bookSchema = mongoose.Schema({
	title: {
		type: String,
		reqired: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	read_date:{
		type: String
	},
	image_url:{
		type: String
	},
	visit_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit) {
	Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id, callback) {
	Book.findById(id, callback);
}
module.exports.addBook = function(book, callback) {
	Book.create(book, callback);
}

module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		read_date: book.read_date,
		image_url: book.image_url,
		visit_url: book.visit_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeBook = function(id, callback) {
	var query = {_id: id};
	Book.remove(query, callback);
}
// {
// 	"title": "myname",
//     "genre": "Funny",
//     "description": "description ha",
//     "author": "Adrian Me",
//     "publisher": "Adrian publ",
//     "pages": "326",
//     "image_url": "http://ecx.images-amazon.com/images/I/516YNFvZnrL._SX332_BO1,204,203,200_.jpg",
//     "buy_url": "http://www.amazon.com/gp/product/1594633665/ref=s9_al_bw_g14_i2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-9&pf_rd_r=0REFNNFD8FBGM31ACMF3&pf_rd_t=101&pf_rd_p=2315072422&pf_rd_i=13108091011"
// }

