async function getData(SPARCL_query){
    const wikiURL = "https://query.wikidata.org/sparql";

    const settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: SPARCL_query }
    }

    $.ajax({
        url: wikiURL,
        type: 'GET',
        headers: settings.headers,
        data: settings.data,
        success: function (data){
            console.log("All was succesfull.\n DATA: " + data);
        },
        error: function () {
            console.log("something went wrong")
        }
    });
}