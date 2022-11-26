# API Gateway

Service is located at [`services/api-gateway`](../../../services/api-gateway).

This service consumes other services. For more info, read their docs:

- [`services/contents-service`](./contents-service.md)
- [`services/reviews-service`](./reviews-service.md)

## Software architecture

Apollo Federation (GraphQL) supergraph handler and API Gateway.

Fetches subgraphs provided by each domain services and produces one supergraph, to be consumed by clients.

## File structure

TODO: If we have more than index.ts, explain here.
