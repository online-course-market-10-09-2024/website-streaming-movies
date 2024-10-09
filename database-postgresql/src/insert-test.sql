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