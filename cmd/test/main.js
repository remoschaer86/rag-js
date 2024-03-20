
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
const assistant = new Assistant(conversation, llm, vDB);

system.CreateMessage(Config.llm.chat.systemPrompt)

// PARAMS ======>>
const privateQuestion = "name some animals that live close to trees"
const privateQuestion2 = "I only want those animals that live on land"


async function main() {

  


    user.CreateMessage(privateQuestion)
    user.CreateMessage(privateQuestion2)

   let reply = await assistant.Reply()

    console.log(reply)

    const messages = conversation.GetMessages()
   
}

main()




