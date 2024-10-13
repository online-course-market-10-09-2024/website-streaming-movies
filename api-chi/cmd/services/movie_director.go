package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MovieDirectorService struct {
	Conn *pgxpool.Pool
}

func (s *MovieDirectorService) Open() error {
	config.LoadConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Conn = conn
	return nil
}

func (s *MovieDirectorService) Close() {
	s.Conn.Close()
}

func (s *MovieDirectorService) Create(input *models.MovieDirector) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM create_movie_director(@name);"
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

func (s *MovieDirectorService) Update(input *models.MovieDirector) (models.MovieDirector, error) {
	// Execute SQL
	sql := "SELECT * FROM update_movie_director(@id, @name);"
	args := pgx.NamedArgs{
		"id":   input.Id,
		"name": input.Name,
	}
	value := models.MovieDirector{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Name)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieDirectorService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_movie_director(@id);"
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

func (s *MovieDirectorService) Count() (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_movie_director();"
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieDirectorService) GetAll(search *string, limit *int, page *int) ([]models.MovieDirector, error) {
	// Set default range for limit
	if *limit < 10 {
		*limit = 10
	} else if *limit > 50 {
		*limit = 50
	}

	// Set default range for page
	if *page < 1 {
		*page = 0
	} else {
		*page = *page - 1
	}

	// Execute SQL
	sql := "SELECT * FROM get_all_movie_director(@search, @limit, @page);"
	args := pgx.NamedArgs{
		"search": *search,
		"limit":  *limit,
		"page":   *page,
	}
	value := []models.MovieDirector{}
	rows, err := s.Conn.Query(config.CTX, sql, args)
	if err != nil {
		return value, err
	}
	for rows.Next() {
		item := models.MovieDirector{}

		if err := rows.Scan(&item.Id, &item.Name); err != nil {
			return nil, err
		}

		value = append(value, item)
	}

	// If success return nil
	return value, nil
}
