/**
* Class made to REQUEST information from Wikidata using SPARQL queries.
*/
const axios = require('axios');

class WikiUtils {
    
    constructor() {
        this.wikiURL = "https://query.wikidata.org/sparql";
    }

    async getData(SPARQL_query){

        var url = this.wikiURL + `?query=${encodeURIComponent(SPARQL_query)}&format=json`;

        const response = await axios.get(url);
        const data = response.data;

        return data.results.bindings;
    }
}


module.exports = WikiUtils