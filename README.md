# Outvio Test Task

This repository contains a Nest.js application that uses MongoDB and Redis. It's configured to run in Docker containers using Docker Compose.

It was created as a test task for Outvio. The task was to create a simple API that with the following requirements:

- Create a basic authentication middleware.
- Create at least one endpoint that is protected by the authentication middleware.
- Create at least one endpoint that is public.
- Create a rate limiter middleware.
  -  Set a rate limit by token to 200 req/hour
  -  Set a rate limit by ip to 100 req/hour
  -  Create a different weight of request rate for every URL

## Prerequisites

Before you start using this Docker Compose setup, you need to have the following software installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

1. Build and start the containers using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   The `-d` flag runs the containers in the background.

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Nest.js application.

3. Open your browser and navigate to [http://localhost:8081](http://localhost:8081) to access MongoDB Express.

   Username: `admin`<br>
   Password: `pass`

4. Stop and remove the containers:

   ```bash
   docker-compose down
   ```

## Task Explanation
### Authentication Middleware
The authentication middleware is implemented in the `AuthGuard` class.

It checks if a `sessionId` cookie is present in the request. If it is, it tries to find a session with the corresponding `sessionId` in the database.

If the session is found, the request is allowed to continue. Otherwise, the request is rejected with a `401 Unauthorized` error.

### Protected Endpoint
The `/accounts` endpoint is a protected, the `AuthGuard` class is used as a Nest.js guard. It's applied to the endpoint using the `UseGuards` decorator.

### Public Endpoint
The `/products` endpoint is public. It's not protected by the `AuthGuard` class.

### Rate Limiter Middleware
The rate limiter middleware is implemented in the `RateLimiterMiddleware` class.

It uses either a `sessionId` cookie or the client's IP address to identify the client. If the session ID is present in the request, it's used along with the client's IP address. Otherwise, only the client's IP address is used.

It uses a Sliding Window algorithm to track the number of requests made by a client. The algorithm is implemented in the `slidingWindowRateLimiter` function.

#### Sliding Window Algorithm
The algorithm uses a Redis sorted set to store the timestamps of the requests made by a client. The timestamps are stored as the score of the set elements.

When a request is made, the algorithm does the following:

1. Adds the current timestamp to the sorted set.
2. Removes all timestamps that are older than the current timestamp minus the window size.
3. Counts the number of timestamps in the sorted set.
4. If the number of timestamps is greater than the allowed number of requests, the request is rejected with a `429 Too Many Requests` error.