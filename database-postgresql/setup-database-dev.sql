-- Create tables and types
\i /docker-entrypoint-initdb.d/src/enums.sql
\i /docker-entrypoint-initdb.d/src/data_tables.sql

-- Create functions
\i /docker-entrypoint-initdb.d/src/functions/movie_category.sql
\i /docker-entrypoint-initdb.d/src/functions/movie_depend_movie_category.sql
\i /docker-entrypoint-initdb.d/src/functions/movie_depend_movie_director.sql
\i /docker-entrypoint-initdb.d/src/functions/movie_director.sql
\i /docker-entrypoint-initdb.d/src/functions/movie.sql

-- Create triggers
\i /docker-entrypoint-initdb.d/src/triggers/movie_depend_movie_category.sql
\i /docker-entrypoint-initdb.d/src/triggers/movie_depend_movie_director.sql

-- Insert test
\i /docker-entrypoint-initdb.d/src/insert-test.sql