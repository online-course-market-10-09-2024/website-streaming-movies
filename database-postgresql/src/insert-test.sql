-- Insert movie_category
INSERT INTO movie_category (id, name) VALUES ('6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', 'category 1');
INSERT INTO movie_category (id, name) VALUES ('493ea1f9-d9c4-4d2d-ab45-498472506081', 'category 2');
INSERT INTO movie_category (id, name) VALUES ('d96c08fe-4892-4a01-a535-4a7a3b736f1c', 'category 11');

-- Insert movie
INSERT INTO movie (id, movie_category_id, name)
VALUES ('0bc66ff1-15ec-4d54-8830-1baf807b8091', '6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', 'movie 1');
INSERT INTO movie (id, movie_category_id, name)
VALUES ('2292fde6-3594-4924-b6be-d5336d7882ec', '6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', 'movie 2');
INSERT INTO movie (id, movie_category_id, name)
VALUES ('303977f6-ea0d-44e0-b7db-b76b87fa146e', '6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', 'movie 11');

-- Insert movie_director
INSERT INTO movie_direcator (id, name) VALUES ('436d3a76-c367-403d-bc98-c27fd0ae0413', 'director 1');
INSERT INTO movie_direcator (id, name) VALUES ('610b5ac2-c16e-4d80-bdcf-95bc5c10dec6', 'director 2');
INSERT INTO movie_direcator (id, name) VALUES ('24f9f4c2-d3b8-4d30-afeb-d94537a18b76', 'director 3');

-- Insert movie_depend_movie_category
INSERT INTO movie_depend_movie_category (movie_category_id, movie_id) VALUES ('6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', '0bc66ff1-15ec-4d54-8830-1baf807b8091');
INSERT INTO movie_depend_movie_category (movie_category_id, movie_id) VALUES ('493ea1f9-d9c4-4d2d-ab45-498472506081', '0bc66ff1-15ec-4d54-8830-1baf807b8091');
INSERT INTO movie_depend_movie_category (movie_category_id, movie_id) VALUES ('d96c08fe-4892-4a01-a535-4a7a3b736f1c', '0bc66ff1-15ec-4d54-8830-1baf807b8091');