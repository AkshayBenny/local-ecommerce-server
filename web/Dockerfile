# Stage 1: Build
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./

CMD ["npm", "start"]

EXPOSE 3000
