CREATE TRIGGER prevent_before_insert_movie_depend_movie_category
BEFORE INSERT ON public.movie_depend_movie_category
FOR EACH ROW
EXECUTE FUNCTION limit_movie_depend_movie_category();
