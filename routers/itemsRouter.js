const express = require('express');
const simpleSearch = require('../api/items/simpleSearch');
const some = require('../api/items/some');

module.exports = (itemsRepository) => {
    const itemsRouter = express.Router();

    /* Add item-specific middleware here */

    itemsRouter.get('/search', simpleSearch(itemsRepository));
    itemsRouter.get('/some', some(itemsRepository));

    return itemsRouter;
}
