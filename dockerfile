# Application Docker file Configuration
# Using multi-stage build
FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Build the image as production
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

ENV PORT=3000
ENV NODE_ENV=Production

RUN npm install

COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}
CMD ["npm", "run" ,"start"]
