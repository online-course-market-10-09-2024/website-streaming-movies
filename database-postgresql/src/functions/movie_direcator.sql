CREATE OR REPLACE FUNCTION create_movie_direcator(
        input_name TEXT
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie_direcator (
            name
        ) VALUES (
            input_name
        )
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_movie_direcator(
        input_id   UUID,
        input_name TEXT
    )
    RETURNS TABLE (
        id   UUID,
        name TEXT
    )
    AS $$
    BEGIN
        UPDATE movie_direcator
        SET name = input_name
        WHERE movie_direcator.id = input_id;

        RETURN QUERY
            SELECT
                movie_direcator.id,
                movie_direcator.name
            FROM movie_direcator
            WHERE movie_direcator.id = input_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie_direcator(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM movie_direcator
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie_direcator()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM movie_direcator;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;