const express = require('express');
const simpleSearch = require('./service/items/simpleSearch');
const some = require('./service/items/some');

module.exports = (itemsRepository) => {
    const itemsRouter = express.Router();

    /* Add item-specific middleware here */

    itemsRouter.get('/search', simpleSearch(itemsRepository));
    itemsRouter.get('/some', some(itemsRepository));

    return itemsRouter;
}
