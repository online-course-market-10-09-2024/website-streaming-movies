CREATE OR REPLACE FUNCTION create_movie_director(
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
        INSERT INTO movie_director (
            name
        ) VALUES (
            input_name
        )
        RETURNING movie_director.id INTO return_id;

        RETURN QUERY
            SELECT
                movie_director.id,
                movie_director.name
            FROM movie_director
            WHERE movie_director.id = return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_movie_director(
        input_id   UUID,
        input_name TEXT
    )
    RETURNS TABLE (
        id   UUID,
        name TEXT
    )
    AS $$
    BEGIN
        UPDATE movie_director
        SET name = input_name
        WHERE movie_director.id = input_id;

        RETURN QUERY
            SELECT
                movie_director.id,
                movie_director.name
            FROM movie_director
            WHERE movie_director.id = input_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie_director(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM movie_director
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie_director()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM movie_director;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_movie_director(
        input_search TEXT,
        input_limit  NUMERIC,
        input_page   NUMERIC
    )
    RETURNS TABLE (
        id   UUID,
        name TEXT
    )
    AS $$
    DECLARE
        value_count NUMERIC;
        max_page    NUMERIC;
    BEGIN
        -- Get count
        SELECT count_movie_director() INTO value_count;

        -- Set default limit range
        IF input_limit < 10 THEN
            input_limit := 10;
        ELSIF input_limit > 50 THEN
            input_limit := 50;
        END IF;

        -- Set max_page
        max_page :=
            CASE WHEN CEIL(value_count::NUMERIC / input_limit) > 0
                THEN CEIL(value_count::NUMERIC / input_limit) - 1
                ELSE 0
            END;

        -- Set default page range
        IF input_page < 1 THEN
            input_page := 0;
        ELSIF input_page > max_page THEN
            input_page := max_page;
        END IF;

        RETURN QUERY
            SELECT movie_director.id, movie_director.name
            FROM movie_director
            WHERE movie_director.name ILIKE '%' || input_search || '%'
            LIMIT input_limit
            OFFSET input_limit*input_page;
    END;
    $$ LANGUAGE plpgsql;
