/**
 * Class of the question generator, gets data from wikidata.
 */
const axios = require('axios');
class questionGenerator{
  /**
   * Constructor of the question generator, has the endpoint to get the data from
   */
  constructor(){
    this.endpointUrl = 'https://query.wikidata.org/sparql';
    
  }
  /**
   * Method to make a request to get data from wikidata using sparql
   * @param {*} sparqlQuery
   * @returns 
   */
  async makeSPARQLQuery(sparqlQuery) {
  
    //url to get the query
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      sparqlQuery
    )}&format=json`;

    const response = await axios.get(url);
    const data = response.data;
    return data.results.bindings;
  }
}
module.exports = questionGenerator;