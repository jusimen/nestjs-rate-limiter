# Application Docker file Configuration
# Using multi-stage build
FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run seed:build

# Build the image as production
FROM node:20-alpine

WORKDIR /app

ENV PORT=3000
ENV DATABASE_URL=mongodb://mongodb:27017
ENV DATABASE_NAME=my_db
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV SESSION_ID=5fa87940-fc27-4c8d-8c6a-92f69e7f3139
ENV RATE_LIMIT_IP=100
ENV RATE_LIMIT_TOKEN=200

COPY package*.json ./
RUN npm install

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY --from=builder /app/mongo ./mongo

EXPOSE ${PORT}

CMD ["sh","-c","npm run seed && npm run start"]
