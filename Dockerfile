FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma prisma/schema.prisma

RUN npm install

EXPOSE 3000