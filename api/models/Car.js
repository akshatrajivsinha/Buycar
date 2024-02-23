const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
    dealer_id:{
        type:String,
        required:true,
    },
    dealer_name:{
        type:String,
        required:true
    },
    car_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:false,
        default:"N/A"
    },
    car_info:{
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

module.exports = mongoose.model("Car",CarSchema)