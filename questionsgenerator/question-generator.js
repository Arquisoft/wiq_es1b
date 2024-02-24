/**
 * Class of the question generator, gets data from wikidata.
 */
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
   * @param {*} doneCallback 
   * @returns 
   */
  makeSPARQLQuery( sparqlQuery, doneCallback ) {
    var settings = {
      headers: { Accept: 'application/sparql-results+json' },
      data: { query: sparqlQuery }
    };
    return $.ajax( this.endpointUrl, settings );
  }

}
