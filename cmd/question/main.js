
import Config from '../../internal/config/config.js';
import Assistant from "../../internal/chat/Assistant.js";
import Conversation from "../../internal/chat/Conversation.js";
import System from "../../internal/chat/System.js";
import User from "../../internal/chat/User.js";
import ChatGPT from '../../internal/llms/ChatGPT.js';
import Qdrant from '../../internal/vDB/Qdrant.js';
import RetrievalStrategy from '../../internal/chat/RetrievalStrategy.js';
import mongoose from "mongoose";
//import {ConversationModel as Conversation} from '../../internal/appDB/model/Conversation.js';

const vDB = new Qdrant(Config.vDB);
const llm = new ChatGPT(Config.llm);

const conversation = new Conversation();
//const conversation = new Conversation()

const system = new System(conversation);
const user = new User(conversation, llm, vDB);

const augmentStrategy = new RetrievalStrategy(conversation, 'aum')
const assistant = new Assistant(conversation, llm, vDB, augmentStrategy);


// PARAMS ======>>
const systemMessage = "You are a helpful Assistant."
const privateQuestion = "name some animals that live close to trees"
const privateQuestion2 = "I only want those animals that live on land"


async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/test');



    system.CreateMessage(systemMessage)

    user.CreateMessage(privateQuestion)
    user.CreateMessage(privateQuestion2)

    let reply = await assistant.Reply()

    console.log(reply.GetText())

    // user.CreateMessage(privateQuestion2)

    // reply = await assistant.Reply()

    // console.log("--------")
    // console.log(reply.GetText())


    await mongoose.disconnect()




}

main()




