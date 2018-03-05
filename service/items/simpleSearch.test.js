'use strict';

const simpleSearch = require('./simpleSearch');

const mockRequest = () => ({
    query: {}
});

const mockResponse = () => {
    const response = {};
    // mocking chaining i.e. response.status(200).send('data')
    response.status = jest.fn(() => response);
    response.send = jest.fn(() => response);
    return response;
}

test('exports function', () => {
    expect(simpleSearch).toBeInstanceOf(Function);
});

test('returns function', () => {
    expect(simpleSearch({})).toBeInstanceOf(Function);
});

test('calls repository search', () => {
    const repository = {
        search: jest.fn(() => Promise.resolve())
    };
    const search = simpleSearch(repository);
    search(mockRequest(), mockResponse());
    expect(repository.search).toBeCalled();
});

test('status 200 upon success', () => {
    const repository = {
        search: jest.fn(() => Promise.resolve())
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    const searchResult = search(mockRequest(), response);
    Promise.resolve(searchResult).then(() => {
        expect(response.status).toBeCalledWith(200);
    });
});

test('sends through data from repository', () => {
    const repository = {
        search: jest.fn(() => Promise.resolve('data'))
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    const searchResult = search(mockRequest(), response);
    Promise.resolve(searchResult).then(() => {
        expect(response.send).toBeCalledWith('data');
    });
});

test('status 500 upon error', () => {
    const repository = {
        search: jest.fn(() => Promise.reject())
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    const searchResult = search(mockRequest(), response);
    Promise.resolve(searchResult).then(() => {
        expect(response.status).toBeCalledWith(500);
    });
});

test('sends through error from repository', () => {
    const repository = {
        search: jest.fn(() => Promise.reject('error'))
    };
    const search = simpleSearch(repository);
    const response = mockResponse();
    const searchResult = search(mockRequest(), response);
    Promise.resolve(searchResult).then(() => {
        expect(response.send).toBeCalledWith('error');
    });
});
