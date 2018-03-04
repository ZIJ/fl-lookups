'use strict';

const express = require('express');
const config = require('./config');
const EsItemsRepository = require('./esItemsRepository');
const itemsRouter = require('./itemsRouter');

const app = express();
const itemsRepository = new EsItemsRepository(config.elasticsearch);
app.use('/api/v1/items', itemsRouter(itemsRepository));

app.listen(3000, () => console.log('Listening on port 3000'));
