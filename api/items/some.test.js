/* eslint-env jest */

'use strict';

const some = require('./some');
const mockResponse = require('./_test/mockResponse');

test('exports function', () => {
    expect(some).toBeInstanceOf(Function);
});

test('returns function', () => {
    expect(some({})).toBeInstanceOf(Function);
});

test('calls repository.some()', () => {
    const repository = {
        some: jest.fn(() => Promise.resolve())
    };
    const request = {
        query: {}
    };
    const findSome = some(repository);
    findSome(request, mockResponse());
    expect(repository.some).toBeCalled();
});
