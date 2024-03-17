

import Config from '../../internal/config/config.js';
import Assistant from "../../internal/chat/Assistant.js";
import Conversation from "../../internal/chat/Conversation.js";
import System from "../../internal/chat/System.js";
import User from "../../internal/chat/User.js";
import ChatGPT from '../../internal/llms/ChatGPT.js';
import Qdrant from '../../internal/vDB/Qdrant.js';

const vDB = new Qdrant(Config.vDB);
const llm = new ChatGPT(Config.llm);


const conversation = new Conversation();

const system = new System(conversation);
const user = new User(conversation, llm, vDB);
const assistant = new Assistant(conversation, llm);

// PARAMS ======>>
const systemMessage = "You are a helpful Assistant."


export async function CreateConversation() {

    system.CreateMessage(systemMessage)

}

export async function CreatePrivateMessage(userMessage) {

    await user.CreatePrivateMessage(userMessage)

    const reply = await assistant.Reply()

    console.log(reply)
}






