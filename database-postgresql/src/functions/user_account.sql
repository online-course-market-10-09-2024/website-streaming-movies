CREATE OR REPLACE FUNCTION get_profile(input_id UUID)
    RETURNS TABLE (
        id           UUID,
        username     TEXT,
        email        TEXT,
        password     TEXT,
        display_name TEXT,
        create_at    TIMESTAMP WITH TIME ZONE
    ) AS $$
    BEGIN
        RETURN QUERY 
            SELECT id, username, email, password, display_name, create_at
            FROM user_account
            WHERE id = input_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user_account(
        input_username     TEXT,
        input_email        TEXT,
        input_password     TEXT,
        input_display_name TEXT
    )
    RETURNS UUID
    AS $$
    DECLARE
        new_user_id UUID;
    BEGIN
        INSERT INTO user_account (
            username,
            email,
            password,
            display_name
        ) VALUES (
            input_username,
            input_email,
            input_password,
            input_display_name
        )
        RETURNING id INTO new_user_id;

        RETURN new_user_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_user_account(
        input_id           UUID,
        input_username     TEXT,
        input_email        TEXT,
        input_password     TEXT,
        input_display_name TEXT
    )
    RETURNS TABLE (
        id           UUID,
        username     TEXT,
        email        TEXT,
        password     TEXT,
        display_name TEXT
    )
    AS $$
    DECLARE
        sql_query         TEXT := 'UPDATE user_account SET ';
        flag_username     BOOLEAN := false;
        flag_email        BOOLEAN := false;
        flag_password     BOOLEAN := false;
        flag_display_name BOOLEAN := false;
    BEGIN
        -- Check id
        IF input_id IS NULL THEN
            RAISE EXCEPTION 'Must have id!';
        END IF;

        -- Build the SET clause based on non-NULL input values
        IF input_username IS NOT NULL OR input_username != '' THEN
            sql_query := sql_query || 'username = ' || quote_literal(input_username) || ',';
            flag_username = true;
        END IF;

        IF input_email IS NOT NULL OR input_email != '' THEN
            sql_query := sql_query || 'email = ' || quote_literal(input_email) || ',';
            flag_email = true;
        END IF;

        IF input_password IS NOT NULL OR input_password != '' THEN
            sql_query := sql_query || 'password = ' || quote_literal(input_password) || ',';
            flag_password = true;
        END IF;

        IF input_display_name IS NOT NULL OR input_display_name != '' THEN
            sql_query := sql_query || 'display_name = ' || quote_literal(input_display_name) || ',';
            flag_display_name = true;
        END IF;

        -- Remove trailing comma and space from the SET clause
        IF length(sql_query) > 0 THEN
            sql_query := left(sql_query, length(sql_query) - 1);
        END IF;

        -- Only append WHERE clause if there are changes
        IF flag_username = true OR flag_email = true OR flag_password = true OR flag_display_name = true THEN
            sql_query := sql_query || ' WHERE id = ' || quote_literal(input_id) || ';';
            EXECUTE sql_query;
        ELSE
            RAISE EXCEPTION 'No fields to update!';
        END IF;

        RETURN QUERY
            SELECT
                u.id,
                u.username,
                u.email,
                u.password,
                u.display_name
            FROM user_account u
            WHERE u.id = input_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_user_account(
        input_id UUID
    )
    RETURNS UUID
    AS $$
    DECLARE
        new_user_id UUID;
    BEGIN
        UPDATE user_account
        SET status = 'inactive'
        WHERE id = input_id
        RETURNING id INTO new_user_id;

        RETURN new_user_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_user_account()
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM user_account
        WHERE status = 'active' OR status = 'pending';

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;
