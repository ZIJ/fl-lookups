/* eslint-env jest */

'use strict';

module.exports = () => {
    const response = {};
    // mocking chaining i.e. response.status(200).send('data')
    response.status = jest.fn(() => response);
    response.send = jest.fn(() => response);
    return response;
};
