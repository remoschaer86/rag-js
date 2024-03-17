//import Conversation from "./internal/appDB/model/Conversation.js";
import mongoose from "mongoose";
import {Conversation, Message} from "./schema.js";






(async() => {

    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const msg = new Message()

    const conv = new Conversation()


    
    await mongoose.disconnect()


})()

