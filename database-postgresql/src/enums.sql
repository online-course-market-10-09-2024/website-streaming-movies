CREATE TYPE USER_ACCOUNT_STATUS AS ENUM (
    'pending', 'active', 'inactive'
);

CREATE TYPE USER_ACCOUNT_ROLE AS ENUM (
    'admin', 'user'
);
