CREATE TABLE public.user_account (
    id           UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    username     TEXT UNIQUE,
    email        TEXT,
    create_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    password     TEXT NOT NULL,
    display_name TEXT,
    status       USER_ACCOUNT_STATUS DEFAULT 'pending',
    role         USER_ACCOUNT_ROLE DEFAULT 'user'
);