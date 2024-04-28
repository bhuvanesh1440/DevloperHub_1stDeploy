const mongoose =require('mongoose');
 const reviewSchema = new mongoose.Schema({
    taskprovider:{
        type:String,
        required:true
    },
    taskworker:{
        type:String,
        required:true,   //need id
    },
    ratings:{
        type:String,
        require:true,
    }
 })

 const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;