CREATE OR REPLACE FUNCTION create_movie(
        input_movie_category_id UUID,
        input_name              TEXT,
        input_description       TEXT
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie (
            movie_category_id,
            name,
            description
        ) VALUES (
            input_movie_category_id,
            input_name,
            input_description
        )
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_movie(
        input_id                UUID,
        input_movie_category_id UUID,
        input_name              TEXT,
        input_description       TEXT
    )
    RETURNS TABLE (
        id                UUID,
        movie_category_id UUID,
        name              TEXT,
        description       TEXT
    )
    AS $$
    DECLARE
        sql_query        TEXT := 'UPDATE movie SET ';
        fields_to_update INT := 0;  -- Counter to ensure at least one field is updated
    BEGIN
        -- Check id
        IF input_id IS NULL THEN
            RAISE EXCEPTION 'Must provide id!';
        END IF;

        -- Dynamically append fields based on non-null inputs
        IF input_movie_category_id IS NOT NULL THEN
            sql_query := sql_query || 'movie_category_id = ' || quote_literal(input_movie_category_id);
            fields_to_update := fields_to_update + 1;
        END IF;

        IF input_name IS NOT NULL AND input_name != '' THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'name = ' || quote_literal(input_name);
            fields_to_update := fields_to_update + 1;
        END IF;

        IF input_description IS NOT NULL AND input_description != '' THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'description = ' || quote_literal(input_description);
            fields_to_update := fields_to_update + 1;
        END IF;

        -- Ensure that at least one field is updated
        IF fields_to_update = 0 THEN
            RAISE EXCEPTION 'No fields to update!';
        END IF;

        -- Add WHERE clause to update the specific movie
        sql_query := sql_query || ' WHERE id = ' || quote_literal(input_id) || ';';

        -- Execute the dynamic query
        EXECUTE sql_query;

        -- Return the updated movie
        RETURN QUERY
            SELECT
                movie.id,
                movie.movie_category_id,
                movie.name,
                movie.description
            FROM movie
            WHERE movie.id = input_id;

    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_movie(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        DELETE FROM movie
        WHERE id = input_id
        RETURNING id INTO return_id;

        RETURN return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_movie()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM movie;

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;