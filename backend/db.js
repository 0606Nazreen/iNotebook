const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inoteboo?readPreference=primary&appname=MongoDB%20Compass&ssl=false";


const connectDatabase = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose successfully");
    })
    
}
module.exports = connectDatabase;