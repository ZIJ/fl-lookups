# fl-lookups
Geo search endpoint powered by ElasticSearch

## Usage

#### Prerequisites
- docker
- node.js

#### Set up local ElasticSearch cluster

```
$ docker pull docker.elastic.co/elasticsearch/elasticsearch-oss:6.2.2
...
$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.2.2
```
#### Hydrade ElasticSearch with test data

```
$ node ./scripts/populateElasticsearch.js
```

#### Run app

```
$ npm test
...
$ npm start
```
```
$ curl "http://localhost:3000/api/v1/items/search?lat=51.5223007&lng=-0.217100999&searchTerm=canon%20lens" 
```
