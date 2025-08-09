const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook"; // change DB name if needed

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI); // no deprecated options
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
