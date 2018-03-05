/* Just passes through results of some() repository method */
'use strict';

module.exports = (repository) => (request, response) => {
    repository.some()
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(500).send(error);
    });
}
