import Config from '../../internal/config/config.js';
import express from 'express';
import Conversation from '../../internal/chat/Conversation.js';
import Assistant from "../../internal/chat/Assistant.js";
import System from "../../internal/chat/System.js";
import User from "../../internal/chat/User.js";
import ChatGPT from '../../internal/llms/ChatGPT.js';
import Qdrant from '../../internal/vDB/Qdrant.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const STATIC_FILES_PATH = join(__dirname, '../../client/dist');

const vDB = new Qdrant(Config.vDB);
const llm = new ChatGPT(Config.llm);

const app = express()
const PORT = Config.api.port;

app.use(express.json());


app.use(express.static(STATIC_FILES_PATH));

const conversation = new Conversation();

const system = new System(conversation);
system.CreateMessage(Config.llm.chat.systemPrompt)

const user = new User(conversation, llm, vDB);
const assistant = new Assistant(conversation, llm, vDB);

app.post('/api/conversation', async (req, res) => {


  return res.status(200).json({
    success: true,
    payload: {
      conversation: conversation
    }
  })
})

app.get('/api/conversation/:id', async (req, res) => {

  return res.status(200).json({
    success: true,
    payload: {
      conversation: conversation
    }
  })
})

app.post('/api/conversation/:conversationId/messages', async (req, res) => {

  user.CreateMessage(req.body.content)

  const reply = await assistant.Reply()

  return res.status(201).json({
    success: true,
    payload: {
      reply
    }
  })
})

app.delete('/api/conversation/:id', async (req, res) => {

  conversation.ClearMessages()

  return res.status(200).json({
    success: true
  })
})

app.get('*', (req, res) => {
  res.sendFile(`${STATIC_FILES_PATH}/index.html`);
});


app.listen(PORT, () => `App listening on port ${PORT}`)
