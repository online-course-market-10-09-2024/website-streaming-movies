package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MovieCategoryService struct {
	Conn *pgxpool.Pool
}

func (s *MovieCategoryService) Open() error {
	config.LoadConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Conn = conn
	return nil
}

func (s *MovieCategoryService) Close() {
	s.Conn.Close()
}

func (s *MovieCategoryService) Create(input *models.MovieCategory) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM create_movie_category(@name);"
	args := pgx.NamedArgs{
		"name": input.Name,
	}
	value := ""
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieCategoryService) Update(input *models.MovieCategory) (models.MovieCategory, error) {
	// Execute SQL
	sql := "SELECT * FROM update_movie_category(@id, @name);"
	args := pgx.NamedArgs{
		"id":   input.Id,
		"name": input.Name,
	}
	value := models.MovieCategory{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Name)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieCategoryService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_movie_category(@id);"
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

func (s *MovieCategoryService) Count() (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_movie_category();"
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
