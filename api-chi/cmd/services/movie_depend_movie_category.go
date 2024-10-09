package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MovieDependMovieCategoryService struct {
	Conn *pgxpool.Pool
}

func (s *MovieDependMovieCategoryService) Open() error {
	config.LoadConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Conn = conn
	return nil
}

func (s *MovieDependMovieCategoryService) Close() {
	s.Conn.Close()
}

func (s *MovieDependMovieCategoryService) Create(input *models.MovieDependMovieCategory) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM create_movie_depend_movie_category(@movie_category_id, @movie_id);"
	args := pgx.NamedArgs{
		"movie_category_id": input.MovieCategoryId,
		"movie_id":          input.MovieId,
	}
	value := ""
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieDependMovieCategoryService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_movie_depend_movie_category(@id);"
	args := pgx.NamedArgs{
		"id": *id,
	}
	value := ""
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieDependMovieCategoryService) Count() (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_movie_depend_movie_category();"
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
