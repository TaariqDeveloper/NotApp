const mongoose = require("mongoose")
const connectedToMongodb = async () => {
        try {
                await mongoose.connect("mongodb://localhost:27017/note_App");
                console.log("connected to mongodb")
        } catch (error) {
                console.log("Error connecting to mongoDb " , error.message)
        }
}

connectedToMongodb()

module.exports ={ connectedToMongodb}

