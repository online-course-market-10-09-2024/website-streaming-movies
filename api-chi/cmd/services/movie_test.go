package services

import (
	"api-chi/cmd/models"

	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_MovieService(t *testing.T) {
	id := ""
	service := MovieService{}

	t.Run("Count success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Count database
		count, err := service.Count()
		assert.NoError(t, err)
		assert.Greater(t, count, 0)
	})

	t.Run("GetAll default success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 10
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.Movie{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Name)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll limit < 10 will return 10 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 9
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.Movie{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Name)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll limit > 50 will return 50 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 51
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.Movie{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Name)
		}
		assert.Equal(t, count, 50)
	})

	t.Run("GetAll page < 1 will return 50 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 10
		page := 0

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.Movie{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Name)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll with search is movie 1", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := "movie 1"
		limit := 20
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.Movie{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Name)
		}
		assert.Less(t, count, 20)
	})

	t.Run("Create success with all attribute", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Name:            "test movie",
			InitialDate:     "2024-10-12",
			ThumbnailImage:  "test.png",
			TrailerVideoUrl: "test-trailer",
			Description:     "movie is test movie",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)

		// Assign value to id
		id = value
	})

	t.Run("Update success with name", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:   id,
			Name: "test movie is a good test movie",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Name, input.Name)
	})

	t.Run("Update success with initial date", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:          id,
			InitialDate: "2024-12-25",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.InitialDate, input.InitialDate)
	})

	t.Run("Update success with thumbnail image", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:             id,
			ThumbnailImage: "movie-test.png",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.ThumbnailImage, input.ThumbnailImage)
	})

	t.Run("Update success with trailer video url", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:              id,
			TrailerVideoUrl: "trailer-video-url-movie",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.TrailerVideoUrl, input.TrailerVideoUrl)
	})

	t.Run("Update success with description", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:          id,
			Description: "this is description of test movie",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Description, input.Description)
	})

	t.Run("Update success with all", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.Movie{
			Id:              id,
			Name:            "this is a only test movie",
			InitialDate:     "2024-12-30",
			ThumbnailImage:  "thumbnail-for-best-test-movie.png",
			TrailerVideoUrl: "this-best-trailer-video-url-for-test-movie",
			Description:     "this move is description for test only movie",
		}

		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Name, input.Name)
		assert.Equal(t, value.InitialDate, input.InitialDate)
		assert.Equal(t, value.ThumbnailImage, input.ThumbnailImage)
		assert.Equal(t, value.TrailerVideoUrl, input.TrailerVideoUrl)
		assert.Equal(t, value.Description, input.Description)
	})

	t.Run("Remove success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Remove database
		value, err := service.Remove(&id)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
	})
}
