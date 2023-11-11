# Outvio Test Task

## Description

This project provides a Docker Compose configuration for running a Nest.js application alongside MongoDB, MongoDB Express, and Redis containers.

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

2. Seed the database with some test data:

   ```bash
   docker-compose exec app npm run db:seed
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Nest.js application.

4. Open your browser and navigate to [http://localhost:8081](http://localhost:8081) to access MongoDB Express.

   Username: `admin`<br>
   Password: `pass`

5. Stop and remove the containers:

   ```bash
   docker-compose down
   ```

## Configuration

The `docker-compose.yaml` file defines the following services:

- **app**: This service runs the Nest.js application and maps port 3000 on your host to port 3000 in the container. It also mounts your application code and node_modules as volumes for development convenience. It depends on the `mongodb` and `redis` services.

- **mongodb**: This service uses the latest MongoDB image and maps port 27017 on your host to port 27017 in the container.

- **mongodb-express**: This service provides a web-based MongoDB management interface (MongoDB Express) and maps port 8081 on your host to port 8081 in the container. It's configured to connect to the `mongodb` service using the provided credentials.

- **redis**: This service uses the latest Redis image and maps port 6379 on your host to port 6379 in the container.

## Environment Variables

You can customize the configuration by modifying a `.env` file with your own environment variables.:

- `DATABASE_URL`: The MongoDB connection URI. Default is `mongodb://mongodb:27017`.
- `DATABASE_NAME`: The name of the MongoDB database. Default is `my_db`.
- `REDIS_HOST`: The hostname of the Redis server. Default is `localhost`.
- `REDIS_PORT`: The port on which Redis is running. Default is `6379`.
- `SESSION_ID`: A Session ID for testing purposes. This will ensure it will always be added when seeding the database.
- `RATE_LIMIT_IP`: Tokens per IP address. Default is `100`.
- `RATE_LIMIT_SESSION`: Tokens per session. Default is `200`.

## Maintenance

To stop and remove the containers, use the following command:

```bash
docker-compose down
```
