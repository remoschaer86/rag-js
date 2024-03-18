class Sources {
    constructor(data) {
        this.data = data
        this.instruction = `Please answer all my previous quesitons based on the individual text snippets below. You can find the text snippets inside triple quotation marks. Each text snippet has a relevance score associated to it where the one with the highest score should be the most relevant to the user's question and the one with the lowest score should be the least relevant to the user's question. Don't mention anything about text snippets or relevance scores in your answer. just answer the question itself.`;
    }

    String() {
        let resultsStr = "";
    
        this.data.forEach((result, resIndex) => {
            if (resIndex > 0) {
                resultsStr += "\n"
            }
          resultsStr += result.GetText()
        });
        return `${this.instruction} \n Text snippets: '''${resultsStr}'''`;
      }

      GetData() {
        return this.data
      }
    
}



export default Sources;