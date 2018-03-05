'use strict';

const express = require('express');
const elasticsearch = require('elasticsearch');
const config = require('./config');
const EsItemsRepository = require('./repositories/esItemsRepository');
const itemsRouter = require('./routers/itemsRouter');

const app = express();
const esClient = new elasticsearch.Client(config.elasticsearch)
const itemsRepository = new EsItemsRepository(esClient);

app.use('/api/v1/items', itemsRouter(itemsRepository));
app.listen(3000, () => console.log('Listening on port 3000'));
