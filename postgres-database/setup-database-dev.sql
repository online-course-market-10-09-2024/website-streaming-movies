CREATE DATABASE streamingmovies;

\c streamingmovies;

-- Create tables and types
\i /docker-entrypoint-initdb.d/src/enums.sql
\i /docker-entrypoint-initdb.d/src/data_tables.sql
