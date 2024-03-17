import OpenAI from "openai";
import Embedding from "./Embedding.js";

class ChatGPT {

    constructor(config) {
      this.config = config;
  
      this.openai = new OpenAI({
        organization: this.config.client.organization
      });
  
    }
  
  
    async CreateSingleEmbedding(text) {
      const embedding = await this.openai.embeddings.create({
        model: this.config.embeddings.model,
        input: text,
        encoding_format: this.config.embeddings.format,
      });
      const vector = embedding.data[0]?.embedding;

      return new Embedding(text, vector)
    }
  
    async CreateEmbeddings(textArray) {
      const promises = textArray.map(async text => {
        return await this.CreateSingleEmbedding(text)
      })
      return await Promise.all(promises)
    }
  
  
    async Chat(messages) {

      const completion = await this.openai.chat.completions.create({
        messages: messages,
        model: this.config.chat.model,
      });
      return completion.choices[0].message.content

    }
    
  
  }
  

  export default ChatGPT;