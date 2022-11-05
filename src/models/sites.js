const {Schema,model} = require('mongoose');
const siteShema =  new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    state:{
        type:Boolean,
        default: true
    },
    description: {
        type: String,
        required:true
    }
},{timestamps:true});
module.exports = model("Sites", siteShema);
