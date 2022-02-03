const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        //console.log(process.env);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db successfuly connect");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB