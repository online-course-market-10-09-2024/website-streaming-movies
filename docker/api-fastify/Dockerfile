FROM node:23.0-alpine3.19

WORKDIR /api-fastify

# Download packages
COPY api-fastify/package.json api-fastify/package-lock.json ./
RUN npm install

# Copy source
COPY api-fastify/src ./src
COPY api-fastify/eslint.config.mjs api-fastify/jest.config.js api-fastify/tsconfig.json ./

ENTRYPOINT ["npm", "run", "dev"]