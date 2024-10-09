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

CREATE TABLE public.movie_category (
    id   UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    name TEXT UNIQUE
);

CREATE TABLE public.movie (
    id                UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    movie_category_id UUID,
    name              TEXT,
    description       TEXT,
    CONSTRAINT fk_movie_category_for_movie
        FOREIGN KEY (movie_category_id)
        REFERENCES public.movie_category(id)
);

CREATE TABLE public.movie_depend_movie_category (
    id                UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    movie_category_id UUID,
    movie_id          UUID,
    CONSTRAINT fk_movie_category_for_movie_depend
        FOREIGN KEY (movie_category_id)
        REFERENCES public.movie_category(id),
    CONSTRAINT fk_movie_for_movie_depend
        FOREIGN KEY (movie_id)
        REFERENCES public.movie(id)
);

CREATE TABLE public.user_favorite_movie (
    id       UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    user_id  UUID,
    movie_id UUID,
    CONSTRAINT fk_user_for_favorite_movie
        FOREIGN KEY (user_id)
        REFERENCES public.user_account(id),
    CONSTRAINT fk_movie_for_favorite_movie
        FOREIGN KEY (movie_id)
        REFERENCES public.movie(id)
);