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

		// Count database
		count, err := service.Count()
		assert.NoError(t, err)
		assert.Greater(t, count, 0)
	})

	t.Run("Create success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Declare input
		input := models.Movie{
			MovieCategoryId: "6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1",
			Name: "test movie",
			Description: "movie is test movie",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)

		// Assign value to id
		id = value
	})

	t.Run("Update success with movie_category", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Declare input
		input := models.Movie{
			Id: id,
			MovieCategoryId: "493ea1f9-d9c4-4d2d-ab45-498472506081",
		}
	
		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.MovieCategoryId, input.MovieCategoryId)
	})

	t.Run("Update success with name", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Declare input
		input := models.Movie{
			Id: id,
			Name: "this move is test movie",
		}
	
		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Name, input.Name)
	})

	t.Run("Update success with description", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Declare input
		input := models.Movie{
			Id: id,
			Description: "this move is test movie",
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

		// Declare input
		input := models.Movie{
			Id: id,
			MovieCategoryId: "6d35f2ac-9c3f-416e-aefe-6f21b90e7fb1",
			Name: "this is a only test movie",
			Description: "this move is test only movie",
		}
	
		// Update database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.MovieCategoryId, input.MovieCategoryId)
		assert.Equal(t, value.Name, input.Name)
		assert.Equal(t, value.Description, input.Description)
	})

	t.Run("Remove success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Remove database
		value, err := service.Remove(&id)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
	})
}

