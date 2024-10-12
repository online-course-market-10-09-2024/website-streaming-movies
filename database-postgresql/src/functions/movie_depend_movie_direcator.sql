CREATE OR REPLACE FUNCTION create_movie_depend_movie_direcator (
        input_movie_direcator_id UUID,
        input_movie_id          UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie_depend_movie_direcator (
            movie_direcator_id,
            movie_id
        ) VALUES (
            input_movie_direcator_id,
            input_movie_id
        )
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie_depend_movie_direcator(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM movie_depend_movie_direcator
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie_depend_movie_direcator()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM movie_depend_movie_direcator;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;
