import dotenv from 'dotenv'
dotenv.config()


const Config = {
    vDB: {
        client: {
            host: process.env.VDB_HOST,
            port: parseInt(process.env.VDB_PORT)
        },
        collection: {
            name: process.env.VDB_COLLECTION_NAME,
            vectors: { size: parseInt(process.env.VDB_COLLECTION_SIZE), distance: process.env.VDB_COLLECTION_DISTANCE }
        },
        search: {
            limit: parseInt(process.env.VDB_SEARCH_LIMIT)
        }
    },
    llm: {
        client: {
            organization: process.env.OPENAI_ORG,
        },
        embeddings: {
            model: process.env.LLM_EMBEDDING_MODEL,
            format: process.env.LLM_EMBEDDING_FORMAT
        },
        chat: {
            model: process.env.LLM_CHAT_MODEL,
            systemPrompt: process.env.LLM_SYSTEM_PROMPT
        }
    },
    api: {
        port: parseInt(process.env.API_PORT)
    }
}


export default Config;