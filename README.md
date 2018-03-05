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
## Tech stack

#### Goals

- Design and implement /search endpoint according to problem statement
- Build with scalability in mind (i.e. making it scaleable should be much easier than rewrite)
- Critical test coverage

#### Non-goals

- Production-ready app (ci/cd, cloud infra, logging, security, edge cases)
- Scaleable as is (i.e. scaling is trivial without any changes to code)
- Full test coverage

#### Assumptions

- Endpoint is used directly by client apps (web and mobile)
- Full cycle usage manner, not autocomplete (i.e. click search -> see results, like airbnb or foursquare)
- List view first, map view second. Item info matters more than location nuances within reasonable bounds.
- Read-skewed usage (10^1+ times more reads than writes to storage)

#### Search engine options

- sqlite & spatialite
    - easy to get up and running
    - limited full-text search capabilities
    - not scaleable
    - low-level geo API (SpatialSQL)
- postgres & postgis
    - robust / low maintenance
    - fast (likely won't need horizontal scaling)
    - sharding is difficult
    - low-level geo API (SpatialSQL)
- elasticsearch
    - highly scaleable
    - rich text search API out of the box
    - high-level geo API out of the box
    - harder to maintain at scale than rdbms
- mongodb
    - easy to get up and running
    - high-level geo API out of the box
    - quite scaleable, but not as good as ES
    - limited / lower level text search api
    - harder to maintain at scale than rdbms
    
All options except for sqlite are feasible for production use. Hard to go wrong with either Postgres or Elastic, both are battle-tested at scale. Elastic though is future-proof, scaleable and provides everything out of the box, so going with it.

