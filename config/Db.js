const mongoose = require("mongoose");

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectdb;