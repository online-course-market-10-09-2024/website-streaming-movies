CREATE OR REPLACE FUNCTION create_movie(
        input_name              TEXT,
        input_initial_date      DATE,
        input_thumbnail_image   TEXT,
        input_trailer_video_url TEXT,
        input_description       TEXT
    )
    RETURNS TABLE (
        id                UUID,
        name              TEXT,
        initial_date      DATE,
        thumbnail_image   TEXT,
        trailer_video_url TEXT,
        description       TEXT
    )
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO movie (
            name,
            initial_date,
            thumbnail_image,
            trailer_video_url,
            description
        ) VALUES (
            input_name,
            input_initial_date,
            input_thumbnail_image,
            input_trailer_video_url,
            input_description
        )
        RETURNING movie.id INTO return_id;

        RETURN QUERY
            SELECT
                movie.id,
                movie.name,
                movie.initial_date,
                movie.thumbnail_image,
                movie.trailer_video_url,
                movie.description
            FROM movie
            WHERE movie.id = return_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_movie(
        input_id                UUID,
        input_name              TEXT,
        input_initial_date      DATE,
        input_thumbnail_image   TEXT,
        input_trailer_video_url TEXT,
        input_description       TEXT
    )
    RETURNS TABLE (
        id                UUID,
        name              TEXT,
        initial_date      DATE,
        thumbnail_image   TEXT,
        trailer_video_url TEXT,
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
        IF input_name IS NOT NULL AND input_name != '' THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'name = ' || quote_literal(input_name);
            fields_to_update := fields_to_update + 1;
        END IF;

        IF input_initial_date IS NOT NULL THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'initial_date = ' || quote_literal(input_initial_date);
            fields_to_update := fields_to_update + 1;
        END IF;

        IF input_thumbnail_image IS NOT NULL AND input_thumbnail_image != '' THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'thumbnail_image = ' || quote_literal(input_thumbnail_image);
            fields_to_update := fields_to_update + 1;
        END IF;

        IF input_trailer_video_url IS NOT NULL AND input_trailer_video_url != '' THEN
            IF fields_to_update > 0 THEN
                sql_query := sql_query || ', ';
            END IF;
            sql_query := sql_query || 'trailer_video_url = ' || quote_literal(input_trailer_video_url);
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
                movie.name,
                movie.initial_date,
                movie.thumbnail_image,
                movie.trailer_video_url,
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

CREATE OR REPLACE FUNCTION get_all_movie(
        input_search TEXT,
        input_limit  NUMERIC,
        input_page   NUMERIC
    )
    RETURNS TABLE (
        id                UUID,
        name              TEXT,
        initial_date      DATE,
        thumbnail_image   TEXT,
        trailer_video_url TEXT,
        description       TEXT
    )
    AS $$
    DECLARE
        value_count NUMERIC;
        max_page    NUMERIC;
    BEGIN
        -- Get count
        SELECT count_movie() INTO value_count;

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
            SELECT
                movie.id,
                movie.name,
                movie.initial_date,
                movie.thumbnail_image,
                movie.trailer_video_url,
                movie.description
            FROM movie
            WHERE movie.name ILIKE '%' || input_search || '%'
            LIMIT input_limit
            OFFSET input_limit*input_page;
    END;
    $$ LANGUAGE plpgsql;
