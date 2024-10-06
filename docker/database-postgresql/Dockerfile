FROM postgres:17-alpine3.19

# Install additional tools using apk
RUN apk update && \
    apk add --no-cache postgresql-client

# Define build argument
ARG ENVIRONMENT

# Copy the appropriate setup file based on the environment
COPY database-postgresql/src /docker-entrypoint-initdb.d/src

# Setup database dir
WORKDIR /database

# Copy file to database
COPY database-postgresql/setup-database-dev.sql /docker-entrypoint-initdb.d/
