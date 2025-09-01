import mongoose from 'mongoose'

// const models = {} // dictionary of all the models

console.log("connecting to mongodb")

// name of db -> web-sharer-a3
await mongoose.connect('mongodb+srv://laurak11_db_user:lauraspilotstudy1234@pilotdata.rr3gops.mongodb.net/?retryWrites=true&w=majority&appName=PilotData')
console.log("successfully conected to mongodb")

const messageSchema = new mongoose.Schema({
    courseId: String, // full course name eg 'INFO441', no spaces
    courseNumber: String,
    courseTitle: String,
    avgRating: Number,
    courseCollege: String, //engineering, info, etc.
    credits: String,
    description: String,
    genEdReqs: [String],
    tags: [String],
    reviews: [String]
})

const Message = mongoose.model('Message', messageSchema)

console.log("finished creating models")


export default Message;