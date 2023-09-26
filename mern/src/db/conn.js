const mongoose = require("mongoose");

uri = "mongodb://127.0.0.1:27017/testApp";

const connectdb = () => {
    return mongoose.connect(uri).then(() => {
        console.log(" connection successful");
    }).catch((e)=>{
        console.log(" no connection");
    })
};

module.exports=connectdb;