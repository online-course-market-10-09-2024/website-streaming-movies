package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MovieDependMovieDirecatorService struct {
	Conn *pgxpool.Pool
}

func (s *MovieDependMovieDirecatorService) Open() error {
	config.LoadConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Conn = conn
	return nil
}

func (s *MovieDependMovieDirecatorService) Close() {
	s.Conn.Close()
}

func (s *MovieDependMovieDirecatorService) Create(input *models.MovieDependMovieDirecator) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM create_movie_depend_movie_direcator(@movie_direcator_id, @movie_id);"
	args := pgx.NamedArgs{
		"movie_direcator_id": input.MovieDirecatorId,
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

func (s *MovieDependMovieDirecatorService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_movie_depend_movie_direcator(@id);"
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

func (s *MovieDependMovieDirecatorService) Count() (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_movie_depend_movie_direcator();"
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
