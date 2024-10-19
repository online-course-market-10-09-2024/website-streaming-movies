FROM node:23.0-alpine3.19

WORKDIR /web-vite

# Download packages
COPY web-vite/package.json web-vite/package-lock.json ./
RUN npm install

# Copy source
COPY web-vite/public ./public
COPY web-vite/src ./src
COPY web-vite/eslint.config.js \
  web-vite/index.html \
  web-vite/postcss.config.js \
  web-vite/tailwind.config.ts \
  web-vite/tsconfig.app.json \
  web-vite/tsconfig.json \
  web-vite/tsconfig.node.json \
  web-vite/vite.config.ts ./

ENTRYPOINT ["npm", "run", "dev"]
