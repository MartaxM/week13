const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let BookSchema = new Schema({
   author : {type:String},
   name : {type:String},
   pages: {type:Number}
});

module.exports = mongoose.model("books", BookSchema);