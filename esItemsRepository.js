'use strict';

const elasticsearch = require('elasticsearch');

class EsItemsRepository {

    constructor(esConfig) {
        this.client = new elasticsearch.Client(esConfig);
    }

    search(term, latitude, longitude) {
        const query = buildSearchQuery(term, latitude, longitude);
        return this.client.search({
            index: 'items',
            body: { query }
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
                distance: '4km',
                'location' : {
                    lat: latitude,
                    lon: longitude
                }
            }
        }, {
            match_phrase: {
                'item_name': {
                    query: term,
                    slop: 2
                }
            }
        }],
        should: {
            geo_distance: {
                distance: '1km',
                'location' : {
                    lat: latitude,
                    lon: longitude
                }
            }
        }
    }
});

module.exports = EsItemsRepository;
