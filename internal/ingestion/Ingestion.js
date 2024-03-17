class Ingestion {
    constructor(llm, vDB) {
        this.llm = llm;
        this.vDB = vDB;
    }

    async FromTextArray(textArray) {
        const exists = await this.vDB.CollectionExists()

        if(exists) {
            await this.vDB.DeleteCollection()
        }

        await this.vDB.CreateCollection()
        
        const embeddings = await this.llm.CreateEmbeddings(textArray)
    
        const success = await this.vDB.InsertEmbeddings(embeddings)
    
        return success;

    }
};

export default Ingestion;