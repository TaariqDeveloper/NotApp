const useRoute = require("./routes/auth.js")
// const mongoose = require("mongoose")
const connectedToMongodb  = require("./db/db.js")
const express = require("express")
const port = 3003
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())

// const connectedToMongodb = async () => {
//         try {
//                 await mongoose.connect("mongodb://localhost:27017/note_App");
//                 console.log("connected to mongodb")
//         } catch (error) {
//                 console.log("Error connecting to mongoDb " , error.message)
//         }
// }

// connectedToMongodb()



app.use(useRoute)
app.listen(port, () => {
        connectedToMongodb
        console.log(`server is running on port number ${port}`)
})