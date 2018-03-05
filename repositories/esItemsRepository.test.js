'use strict';

const _ = require('lodash');
const EsItemRepository = require('./esItemsRepository');
const canonSearchResult = require('./_test/canonSearchResult');

const mockClient = {
    search: () => Promise.resolve(canonSearchResult)
};

test('returns array of items', () => {
    const repository = new EsItemRepository(mockClient);
    return repository.search('term', 0, 0).then((result) => {
        expect(result.items).toBeInstanceOf(Array);
    });
});

test('includes all hits', () => {
    const repository = new EsItemRepository(mockClient);
    return repository.search('term', 0, 0).then((result) => {
        expect(result.items.length).toBe(canonSearchResult.hits.hits.length);
    });
});

test('sorts by score in descending order', () => {
    const repository = new EsItemRepository(mockClient);
    const nameScorePairs = canonSearchResult.hits.hits.map((hit) => ({
        score: hit._score,
        name: hit._source.item_name
    }));
    const sortedPairs = _.orderBy(nameScorePairs, 'score', 'desc');
    return repository.search('term', 0, 0).then((result) => {
        expect(result.items.every((item, index) => {
            return item.item_name === sortedPairs[index].name;
        })).toBe(true);
    });
});
