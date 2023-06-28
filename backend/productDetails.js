const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        title:String,
        email: String,
        product_id:{type: String, unique:true},
        type:String,
        PhoneNo:String,
        description:String,
        price:String,
        image:String,
    },
    {
        collection: "productDetails",
    }
);

mongoose.model("productDetails", UserDetailsSchema)