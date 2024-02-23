const mongoose = require("mongoose")

const DealerSchema = new mongoose.Schema({
    dealer_id:{
        type:String,
        required:true,
    },
    dealer_email:{
        type:String,
        required:true,
    },
    dealer_name:{
        type:String,
        required:true,
    },
    dealer_location:{
        type:String,
        required:false,
        default:"N/A"
    },
    dealer_info:{
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

module.exports = mongoose.model("Dealer",DealerSchema)