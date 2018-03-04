/* Simple one-step search for matching items near given point */
'use strict';

module.exports = (repository) => (request, response) => {
    const { searchTerm, lat, lng } = request.query;
    repository.search(searchTerm, lat, lng)
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(500).send(error);
    });
}
