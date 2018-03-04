// TODO split into server, app and repository

const elasticsearch = require('elasticsearch');
const express = require('express');

const app = express();

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

app.get('/geo', (request, response) => {
    const { searchTerm, lat, lng } = request.query;
    client.search({
        index: 'items',
        body: {
            query: {
                "bool" : {
                    "must" : {
                        "match_all" : {}
                    },
                    "filter" : {
                        "geo_distance" : {
                            "distance" : "2km",
                            "location" : {
                                "lat" : lat,
                                "lon" : lng
                            }
                        }
                    } 
                }
            }
        }
    }).then(body => {
        response.status(200).send(body.hits.hits); 
    }).catch(error => {
        response.status(500).send(error);
    });
});

app.get('/fuzzy', (request, response) => {
    const { searchTerm } = request.query;
    client.search({
        index: 'items',
        body: {
            query: {
                fuzzy: {
                    'item_name': searchTerm
                }
            }
        }
    }).then(body => {
        response.status(200).send(body.hits.hits); 
    }).catch(error => {
        response.status(500).send(error);
    });
})

app.get('/all', (request, response) => {
    client.search({
        index: 'items',
        body: {
            query: {
                match_all: {}
            }
        }
    }).then(body => {
        response.status(200).send(body.hits.hits); 
    }).catch(error => {
        response.status(500).send(error);
    });
})


app.listen(3000, () => console.log('Listening on port 3000'));
