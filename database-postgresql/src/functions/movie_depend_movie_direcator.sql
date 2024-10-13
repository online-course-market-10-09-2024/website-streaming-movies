CREATE OR REPLACE FUNCTION create_movie_depend_movie_director (
        input_movie_director_id UUID,
        input_movie_id          UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie_depend_movie_director (
            movie_director_id,
            movie_id
        ) VALUES (
            input_movie_director_id,
            input_movie_id
        )
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie_depend_movie_director(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM movie_depend_movie_director
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie_depend_movie_director()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM movie_depend_movie_director;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION limit_movie_depend_movie_director()
RETURNS TRIGGER AS
$$
BEGIN
    -- Check if already exists one value in table
    IF EXISTS (
        SELECT 1
        FROM movie_depend_movie_director
        WHERE movie_director_id = NEW.movie_director_id AND movie_id = NEW.movie_id
    ) THEN
        RAISE EXCEPTION 'Can''t have more than 1 movie_depend_movie_director with the same values!';
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;
