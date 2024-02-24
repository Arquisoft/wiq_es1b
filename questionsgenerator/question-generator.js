

var 
	sparqlQuery = "SELECT ?country ?countryLabel ?capital ?capitalLabel\n" +
        "WHERE {\n" +
        "  ?country wdt:P31 wd:Q3624078;         # Q3624078 es la clase para países\n" +
        "           wdt:P36 ?capital.            # P36 es la propiedad para la capital de un país\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}";

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
		console.log( data );
	}
);

/**
 * template json
 * guardar: pregunta en español sin dato especifico (completar al hacer la pregunta), 
 * sparqlquery pa esa pregunta
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
    return $.ajax( this.endpointUrl, settings ).then( doneCallback );
  }

}
