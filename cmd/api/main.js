import Config from '../../internal/config/config.js';
import express from 'express';
import Conversation from '../../internal/chat/Conversation.js';
import Assistant from "../../internal/chat/Assistant.js";
import System from "../../internal/chat/System.js";
import User from "../../internal/chat/User.js";
import ChatGPT from '../../internal/llms/ChatGPT.js';
import Qdrant from '../../internal/vDB/Qdrant.js';


const vDB = new Qdrant(Config.vDB);
const llm = new ChatGPT(Config.llm);

const app = express()
const PORT = Config.api.port;

app.use(express.json());

const conversation = new Conversation();

const system = new System(conversation);
system.CreateMessage(Config.llm.chat.systemPrompt)

const user = new User(conversation, llm, vDB);
const assistant = new Assistant(conversation, llm, vDB);

app.post('/conversation', async (req, res) => {


  return res.status(200).json({
    success: true,
    payload: {
      conversation: conversation
    }
  })
})

app.get('/conversation/:id', async (req, res) => {

  return res.status(200).json({
    success: true,
    payload: {
      conversation: conversation
    }
  })
})

app.post('/conversation/:conversationId/messages', async (req, res) => {

  user.CreateMessage(req.body.content)

  const reply = await assistant.Reply()

  return res.status(201).json({
    success: true,
    payload: {
      reply
    }
  })
})

app.delete('/conversation/:id', async (req, res) => {

  conversation.ClearMessages()

  return res.status(200).json({
    success: true
  })
})


app.listen(PORT, () => `App listening on port ${PORT}`)
