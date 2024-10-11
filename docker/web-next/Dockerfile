FROM node:18.20.4-alpine3.20

WORKDIR /web-next

# Download packages
COPY web-next/package.json web-next/package-lock.json ./
RUN npm install

# Copy source
COPY web-next/src ./src
COPY web-next/.eslintrc.json web-next/next.config.mjs web-next/postcss.config.mjs web-next/tailwind.config.ts web-next/tsconfig.json ./

ENTRYPOINT ["npm", "run", "start"]
