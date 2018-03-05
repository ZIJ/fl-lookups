'use strict';

class EsItemsRepository {

    constructor(esClient) {
        this.client = esClient;
    }

    search(term, latitude, longitude) {
        const query = buildSearchQuery(term, latitude, longitude);
        return this.client.search({
            index: 'items',
            body: { query, size: 20 }
        }).then(body => {
            const items = body.hits.hits.map(hit => hit._source );
            return { items };
        });
    }

    some() {
        return this.client.search({
            index: 'items',
            body: {
                query: {
                    match_all: {}
                }
            }
        }).then(body => {
            const items = body.hits.hits.map(hit => hit._source );
            return { items };
        });
    }

}

const buildSearchQuery = (term, latitude, longitude) => ({
    bool: {
        must: [{
            geo_distance: {
                distance: '100km',
                'location' : {
                    lat: latitude,
                    lon: longitude
                }
            }
        }, {
            match: {
                'item_name': {
                    query: term,
                    minimum_should_match: "30%"
                }
            }
        }],
        should: [{
            geo_distance: {
                distance: '2km',
                'location' : {
                    lat: latitude,
                    lon: longitude
                }
            }
        }, {
            match_phrase: {
                'item_name': {
                    query: term,
                    slop: 50
                }
            }
        }]
    }
});

module.exports = EsItemsRepository;
