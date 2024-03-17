//import Conversation from "./internal/appDB/model/Conversation.js";
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: String,
}, {collection: null});

MessageSchema.methods.HelloWorld = function () {
  console.log("hello");
};

const ConversationSchema = new mongoose.Schema({
  nr: Number,
  text: String,
  message: [MessageSchema],
});

const Conversation = new mongoose.model("conversation", ConversationSchema);
const Message = new mongoose.model("message", MessageSchema);

export { Conversation, Message };