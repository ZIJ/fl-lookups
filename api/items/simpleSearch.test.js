/* eslint-env jest */

'use strict';

const simpleSearch = require('./simpleSearch');
const mockResponse = require('./_test/mockResponse');

const mockRequest = () => ({
    query: {}
});

test('exports function', () => {
    expect(simpleSearch).toBeInstanceOf(Function);
});

test('returns function', () => {
    expect(simpleSearch({})).toBeInstanceOf(Function);
});

test('calls repository.search()', () => {
    const repository = {
        search: jest.fn(() => Promise.resolve())
    };
    const search = simpleSearch(repository);
    search(mockRequest(), mockResponse());
    expect(repository.search).toBeCalled();
});

test('status 200 upon success', done => {
    const repository = {
        search: jest.fn(() => Promise.resolve())
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    search(mockRequest(), response);
    setTimeout(() => {
        expect(response.status).toBeCalledWith(200);
        done();
    }, 1);
});

test('sends through data from repository', done => {
    const repository = {
        search: jest.fn(() => Promise.resolve('data'))
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    search(mockRequest(), response);
    setTimeout(() => {
        expect(response.send).toBeCalledWith('data');
        done();
    }, 1);
});

test('status 500 upon error', done => {
    const repository = {
        search: jest.fn(() => Promise.reject())
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    search(mockRequest(), response);
    setTimeout(() => {
        expect(response.status).toBeCalledWith(500);
        done();
    }, 1);
});

test('sends through error from repository', done => {
    const repository = {
        search: jest.fn(() => Promise.reject('error'))
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    search(mockRequest(), response);
    setTimeout(() => {
        expect(response.send).toBeCalledWith('error');
        done();
    }, 1);
});
