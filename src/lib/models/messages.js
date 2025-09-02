import mongoose from "mongoose";

// const models = {} // dictionary of all the models

console.log("connecting to mongodb");

// name of db -> web-sharer-a3
await mongoose.connect(
  "mongodb+srv://laurak11_db_user:lauraspilotstudy1234@pilotdata.rr3gops.mongodb.net/?retryWrites=true&w=majority&appName=PilotData"
);
console.log("successfully conected to mongodb");

const messageSchema = new mongoose.Schema({
  messages: [
    {
      id: String,
      role: String, // 'user', 'assistant', 'system'
      content: String,
      createdAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionId: String, // optional session identifier
  scenarioTitle: String, // optional scenario context
});

const Message = mongoose.model("Message", messageSchema);

console.log("finished creating models");

export default Message;
