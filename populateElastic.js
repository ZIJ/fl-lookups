#!/usr/bin/env node

/* Populates ES cluster with items from json file */

const elasticsearch = require('elasticsearch');
const data = require('./fatlama.json');
const _ = require('lodash');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const bulk = _.flatten(data.items.map(item => {
    return [
        { index: { _index: 'items', _type: 'fl-item' } },
        {
            'item_name': item.item_name,
            'item_url': item.item_url,
            location: {
                lat: item.lat,
                lon: item.lng,
            }
        }
    ];
}));

client.bulk({
    body: bulk
}, (error, response) => {
    if (error) {
        console.trace(error);
    } else {
        console.log(response);
    }
});
