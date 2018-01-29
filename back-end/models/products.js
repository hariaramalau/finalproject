const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/headphones", { useMongoClient: true });

const Schema = mongoose.Schema;

const productsSchema = new Schema({

    name: String,
    type: String,
    brand: String,
    price: String,
    picture : String

})

const Products = mongoose.model("products", productsSchema);

module.exports = Products;