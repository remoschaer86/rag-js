//import {MessageModel as Message} from "../appDB/model/Conversation.js";
import LLMQuestion from "../llms/llmQuestion.js";
import Message from "./Message.js";

class Assistant {

    constructor(conversation, llm, vDB, augmentStrategy) {
        this.conversation = conversation;
        this.name = 'assistant'
        this.llm = llm;
        this.vDB = vDB;
        this.augmentStrategy = augmentStrategy;

    }

    CreateMessage(text, sources) {

        const msg = new Message(this.name, text, sources)
        this.conversation.AddMessage(msg);
        return msg;
    }


    async getSources() {

        const embeddingStr = this.augmentStrategy.GetEmbeddingString()

        const embedding = await this.llm.CreateSingleEmbedding(embeddingStr)
    
        const {vector} = embedding.GetData();
    
        const results = await this.vDB.Search(vector)
    
        return results
    }


    async Reply(strategy) {

        const messages = this.conversation.GetMessages()
        
        const messageData = messages.map(msg => msg.GetData())

        const llmQuestion = new LLMQuestion(messageData)

        const sources = await this.getSources();

        llmQuestion.AppendAddInfo(sources);

        const messageHistoryWithInfos = llmQuestion.GetMessageHistory()

        const llmResponse = await this.llm.Chat(messageHistoryWithInfos)
        const msg = this.CreateMessage(llmResponse, sources)
        return msg
    }



}


export default Assistant;