const mongoose = require("mongoose")

const BuyerSchema = new mongoose.Schema({
    Buyer_id:{
        type:String,
        required:true,
    },
    Buyer_email:{
        type:String,
        required:true,
    },
    Buyer_name:{
        type:String,
        required:true,
    },
    Buyer_location:{
        type:String,
        required:false,
        default:"N/A"
    },
    Buyer_info:{
        type:String,
        required:false,
        default:"N/A"
    },
    createdDate: {
        type: Date,
        default: Date.now
      },
      updatedDate: {
        type: Date,
        default: Date.now
      }

}
);

module.exports = mongoose.model("Buyer",BuyerSchema)