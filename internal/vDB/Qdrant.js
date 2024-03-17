import { QdrantClient } from "@qdrant/js-client-rest";
import Source from "./Source.js";

class Qdrant {
  constructor(config) {
    this.config = config;
    this.client = new QdrantClient(this.config.client);
  }

  async CreateCollection() {
    await this.client.createCollection(this.config.collection.name, {
      vectors: this.config.collection.vectors,
    });
  }

  async DeleteCollection() {
    await this.client.deleteCollection(this.config.collection.name);
  }

  async CollectionExists() {
    try {
      await this.client.getCollection(this.config.collection.name);
      return true;
    } catch (error) {
      return false;
    }
  }

  createPointsFromEmbedding(embeddings) {
    const points = embeddings.map((embedding) => {
      const { id, text, vector } = embedding.GetData();

      return {
        id: id,
        vector: vector,
        payload: {
          text: text,
        },
      };
    });
    return points;
  }

  async InsertEmbeddings(embeddings) {
    const points = this.createPointsFromEmbedding(embeddings);

    const operationInfo = await this.client.upsert(
      this.config.collection.name,
      {
        wait: true,
        points: points,
      }
    );

    return true;
  }

  async Search(vector) {
    const dbResponse = await this.client.search(this.config.collection.name, {
      vector: vector,
      limit: this.config.search.limit,
    });

    const sources = dbResponse.map((result) =>  new Source(result.payload.text, result.score))

    return sources;
  }
}

export default Qdrant;
