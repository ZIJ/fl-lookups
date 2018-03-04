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
            location: item.lat + ',' + item.lng
        }
    ];
}));

client.indices.create({
    index: 'items',
})
.then(response => console.log(response))
.then(() => client.indices.putMapping({
    index: 'items',
    type: 'fl-item',
    body: {
        properties: {
            item_name: {
                type: 'text'
            },
            item_url: {
                type: 'text'
            },
            location: {
                type: 'geo_point'
            }
        }   
    }
}))
.then(response => console.log(response))
.then(() => client.bulk({
    body: bulk
}))
.then(response => console.log(response))
.catch(error => console.trace(error));
