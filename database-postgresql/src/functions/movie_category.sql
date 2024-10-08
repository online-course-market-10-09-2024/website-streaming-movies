CREATE OR REPLACE FUNCTION create_movie_category(
        input_name TEXT
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie_category (
            name
        ) VALUES (
            input_name
        )
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_movie_category(
        input_id   UUID,
        input_name TEXT
    )
    RETURNS TABLE (
        id   UUID,
        name TEXT
    )
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        UPDATE category_movie
        SET name = input_name
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN QUERY
            SELECT
                c.id,
                c.name
            FROM category_movie c
            WHERE c.id = input_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie_category(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM category_movie
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie_category()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM category_movie;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;