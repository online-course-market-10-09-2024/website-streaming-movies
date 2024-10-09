-- Create tables and types
\i /docker-entrypoint-initdb.d/src/enums.sql
\i /docker-entrypoint-initdb.d/src/data_tables.sql

-- Create category_movie functions
\i /docker-entrypoint-initdb.d/src/functions/movie_category.sql
\i /docker-entrypoint-initdb.d/src/functions/movie.sql

-- Insert test
\i /docker-entrypoint-initdb.d/src/insert-test.sql