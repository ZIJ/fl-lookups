// TODO split into server, app and repository

const elasticsearch = require('elasticsearch');
const express = require('express');

const app = express();

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

app.get('/api/v1/search', (request, response) => {
    const { searchTerm, lat, lng } = request.query;
    client.search({
        index: 'items',
        body: {
            query: {
                bool: {
                    must: [{
                        geo_distance: {
                            distance: '4km',
                            'location' : {
                                lat: lat,
                                lon: lng
                            }
                        }
                    }, {
                        match_phrase: {
                            'item_name': {
                                query: searchTerm,
                                slop: 2
                            }
                        }
                    }],
                    should: {
                        geo_distance: {
                            distance: '1km',
                            'location' : {
                                lat: lat,
                                lon: lng
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

app.get('/api/v1/all', (request, response) => {
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
