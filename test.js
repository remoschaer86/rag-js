import { ConversationModel } from "./internal/appDB/model/Conversation.js";
import mongoose from "mongoose";






(async() => {

    await mongoose.connect('mongodb://127.0.0.1:27017/test');


    const conversation = new ConversationModel();

    conversation.messages.push({ role: 'user', content: 'world', sources: [{score: 4.534, text:"test"}] });

    const savedConversation = await conversation.save()
    
    console.log(savedConversation)

    await mongoose.disconnect()


})()

