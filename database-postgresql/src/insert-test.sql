-- Insert movie_category
INSERT INTO movie_category (id, name) VALUES ('6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1', 'category 1');
INSERT INTO movie_category (id, name) VALUES ('493ea1f9-d9c4-4d2d-ab45-498472506081', 'category 2');
INSERT INTO movie_category (id, name) VALUES ('d96c08fe-4892-4a01-a535-4a7a3b736f1c', 'category 3');
INSERT INTO movie_category (id, name) VALUES ('360d60a6-3f3a-4c00-927a-04aa35410acc', 'category 4');
INSERT INTO movie_category (id, name) VALUES ('5e4147b1-dfc2-422c-b0f2-4ea2202bbde9', 'category 5');
INSERT INTO movie_category (id, name) VALUES ('dfeb245f-e57c-4cc6-8408-5813aecd3e1d', 'category 6');
INSERT INTO movie_category (name) VALUES ('category 7');
INSERT INTO movie_category (name) VALUES ('category 8');
INSERT INTO movie_category (name) VALUES ('category 9');
INSERT INTO movie_category (name) VALUES ('category 10');
INSERT INTO movie_category (name) VALUES ('category 11');
INSERT INTO movie_category (name) VALUES ('category 12');
INSERT INTO movie_category (name) VALUES ('category 13');
INSERT INTO movie_category (name) VALUES ('category 14');
INSERT INTO movie_category (name) VALUES ('category 15');
INSERT INTO movie_category (name) VALUES ('category 16');
INSERT INTO movie_category (name) VALUES ('category 17');
INSERT INTO movie_category (name) VALUES ('category 18');
INSERT INTO movie_category (name) VALUES ('category 19');
INSERT INTO movie_category (name) VALUES ('category 20');
INSERT INTO movie_category (name) VALUES ('category 21');
INSERT INTO movie_category (name) VALUES ('category 22');
INSERT INTO movie_category (name) VALUES ('category 23');
INSERT INTO movie_category (name) VALUES ('category 24');
INSERT INTO movie_category (name) VALUES ('category 25');
INSERT INTO movie_category (name) VALUES ('category 26');
INSERT INTO movie_category (name) VALUES ('category 27');
INSERT INTO movie_category (name) VALUES ('category 28');
INSERT INTO movie_category (name) VALUES ('category 29');
INSERT INTO movie_category (name) VALUES ('category 30');
INSERT INTO movie_category (name) VALUES ('category 31');
INSERT INTO movie_category (name) VALUES ('category 32');
INSERT INTO movie_category (name) VALUES ('category 33');
INSERT INTO movie_category (name) VALUES ('category 34');
INSERT INTO movie_category (name) VALUES ('category 35');
INSERT INTO movie_category (name) VALUES ('category 36');
INSERT INTO movie_category (name) VALUES ('category 37');
INSERT INTO movie_category (name) VALUES ('category 38');
INSERT INTO movie_category (name) VALUES ('category 39');
INSERT INTO movie_category (name) VALUES ('category 40');
INSERT INTO movie_category (name) VALUES ('category 41');
INSERT INTO movie_category (name) VALUES ('category 42');
INSERT INTO movie_category (name) VALUES ('category 43');
INSERT INTO movie_category (name) VALUES ('category 44');
INSERT INTO movie_category (name) VALUES ('category 45');
INSERT INTO movie_category (name) VALUES ('category 46');
INSERT INTO movie_category (name) VALUES ('category 47');
INSERT INTO movie_category (name) VALUES ('category 48');
INSERT INTO movie_category (name) VALUES ('category 49');
INSERT INTO movie_category (name) VALUES ('category 50');
INSERT INTO movie_category (name) VALUES ('category 51');
INSERT INTO movie_category (name) VALUES ('category 52');
INSERT INTO movie_category (name) VALUES ('category 53');
INSERT INTO movie_category (name) VALUES ('category 54');
INSERT INTO movie_category (name) VALUES ('category 55');
INSERT INTO movie_category (name) VALUES ('category 56');
INSERT INTO movie_category (name) VALUES ('category 57');
INSERT INTO movie_category (name) VALUES ('category 58');
INSERT INTO movie_category (name) VALUES ('category 59');
INSERT INTO movie_category (name) VALUES ('category 60');


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