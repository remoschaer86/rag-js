import dotenv from 'dotenv'
dotenv.config()


const Config = {
    vDB: {
        client: {
            host: "localhost",
            port: 6333
        },
        collection: {
            name: "remos_col",
            vectors: { size: 1536, distance: "Cosine" }
        },
        search: {
            limit: 3
        }
    },
    llm: {
        client: {
            organization: process.env.OPENAI_ORG,
        },
        embeddings: {
            model: "text-embedding-3-small",
            format: "float"
        },
        chat: {
            model: 'gpt-3.5-turbo'
        }
    }
}


export default Config;