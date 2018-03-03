// TODO split into server, app and repository

const elasticsearch = require('elasticsearch');
const express = require('express');

const app = express();

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

app.get('/search', (request, response) => {
    const { searchTerm, lat, lng } = request.query;
    client.search({
        index: 'items',
        body: {
            query: {
                "bool" : {
                    "must" : {
                        "match_all" : {}
                    },
                    "must": {
                        "filter" : {
                            "geo_distance" : {
                                "distance" : "200km",
                                "pin.location" : {
                                    "lat" : lat,
                                    "lon" : lng
                                }
                            }
                        }
                    },
                    "must": {
                        "fuzzy": {
                            "item_name": searchTerm
                        }
                    }
                }
            }
        }
    }, (error, searchResponse) => {
        if (error) {
            response.send(error);
        } else {
            response.send(searchResponse);
        }
    });
})

app.listen(3000, () => console.log('Listening on port 3000'));
