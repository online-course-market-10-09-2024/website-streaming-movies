package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MovieService struct {
	Conn *pgxpool.Pool
}

func (s *MovieService) Open() error {
	config.LoadConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Conn = conn
	return nil
}

func (s *MovieService) Close() {
	s.Conn.Close()
}

func (s *MovieService) Create(input *models.Movie) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM create_movie(@movie_category_id, @name, @description);"
	args := pgx.NamedArgs{
		"movie_category_id": input.MovieCategoryId,
		"name":              input.Name,
		"description":       input.Description,
	}
	value := ""
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieService) Update(input *models.Movie) (models.Movie, error) {
	// Execute SQL
	sql := "SELECT * FROM update_movie(@id, @movie_category_id, @name, @description);"
	args := pgx.NamedArgs{
		"id":                input.Id,
		"movie_category_id": input.MovieCategoryId,
		"name":              input.Name,
		"description":       input.Description,
	}
	if input.MovieCategoryId == "" {
		args["movie_category_id"] = nil
	}

	value := models.Movie{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.MovieCategoryId, &value.Name, &value.Description)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_movie(@id);"
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

func (s *MovieService) Count() (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_movie();"
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
