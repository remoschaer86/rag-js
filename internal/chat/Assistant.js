import Message from "./Message.js";
import RetrievalStrategies from "./RetrievalStrategies.js";

class Assistant {

    constructor(conversation, llm, vDB) {
        this.conversation = conversation;
        this.name = 'assistant'
        this.llm = llm;
        this.vDB = vDB;
   
    }

    CreateMessage(text, sources) {
        const msg = new Message(this.name, text, sources)
        this.conversation.AddMessage(msg);
        return msg;
    }


    async getSources() {

        const strategies = new RetrievalStrategies(this.conversation)

        const embeddingStr = strategies.AllUserMessages()

        const embedding = await this.llm.CreateSingleEmbedding(embeddingStr)
    
        const {vector} = embedding.GetData();
    
        const sources = await this.vDB.Search(vector)
    
        return sources
    }


    async Reply() {

        const messages = this.conversation.GetMessages()
        
        const sources = await this.getSources();

        const sourceContent = sources.String()

        const sourceMsg = new Message('user', sourceContent)

        messages.push(sourceMsg)

        const msgData = messages.map(msg => msg.GetData(false))

       const llmResponse = await this.llm.Chat(msgData)

       const msg = this.CreateMessage(llmResponse, sources.GetData())
       return msg
    }

}


export default Assistant;