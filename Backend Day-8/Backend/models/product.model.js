const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName:String,
        productImg:String,
        productDesc:String
    }
)
const productModel = mongoose.model("product",productSchema);
module.exports=productModel;