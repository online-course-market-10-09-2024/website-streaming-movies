package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"time"

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
	sql := "SELECT * FROM create_movie(@name, @initial_date, @thumbnail_image, @trailer_video_url, @description);"
	value := ""
	args := pgx.NamedArgs{
		"name":              input.Name,
		"initial_date":      input.InitialDate,
		"thumbnail_image":   input.ThumbnailImage,
		"trailer_video_url": input.TrailerVideoUrl,
		"description":       input.Description,
	}
	if input.Name == "" {
		args["name"] = nil
	}
	if input.InitialDate == "" {
		args["initial_date"] = nil
	}
	if input.ThumbnailImage == "" {
		args["thumbnail_image"] = nil
	}
	if input.TrailerVideoUrl == "" {
		args["trailer_video_url"] = nil
	}
	if input.Description == "" {
		args["description"] = nil
	}

	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *MovieService) Update(input *models.Movie) (models.Movie, error) {
	// Execute SQL
	sql := "SELECT * FROM update_movie(@id, @name, @initial_date, @thumbnail_image, @trailer_video_url, @description);"
	args := pgx.NamedArgs{
		"id":                input.Id,
		"name":              input.Name,
		"initial_date":      input.InitialDate,
		"thumbnail_image":   input.ThumbnailImage,
		"trailer_video_url": input.TrailerVideoUrl,
		"description":       input.Description,
	}
	if input.Name == "" {
		args["name"] = nil
	}
	if input.InitialDate == "" {
		args["initial_date"] = nil
	}
	if input.ThumbnailImage == "" {
		args["thumbnail_image"] = nil
	}
	if input.TrailerVideoUrl == "" {
		args["trailer_video_url"] = nil
	}
	if input.Description == "" {
		args["description"] = nil
	}

	value := models.Movie{}
	valueTime := time.Time{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(
		&value.Id,
		&value.Name,
		&valueTime,
		&value.ThumbnailImage,
		&value.TrailerVideoUrl,
		&value.Description,
	)
	if err != nil {
		return value, err
	}
	value.InitialDate = valueTime.Format("2006-01-02")

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

func (s *MovieService) GetAll(search *string, limit *int, page *int) ([]models.Movie, error) {
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
	sql := "SELECT * FROM get_all_movie(@search, @limit, @page);"
	args := pgx.NamedArgs{
		"search": *search,
		"limit":  *limit,
		"page":   *page,
	}
	value := []models.Movie{}
	rows, err := s.Conn.Query(config.CTX, sql, args)
	if err != nil {
		return value, err
	}
	for rows.Next() {
		item := models.Movie{}

		if err := rows.Scan(&item.Id, &item.Name); err != nil {
			return nil, err
		}

		value = append(value, item)
	}

	// If success return nil
	return value, nil
}
