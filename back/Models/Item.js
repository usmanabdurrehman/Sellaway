let mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Item = new Schema({
  	favourites:[String],
  	name:String,
  	location:String,
	category:String,
	price:Number,
	featured:Boolean,
	date:String,
	filename:String,
	email:String
},{timestamps:true});

module.exports = mongoose.model('Item',Item)
