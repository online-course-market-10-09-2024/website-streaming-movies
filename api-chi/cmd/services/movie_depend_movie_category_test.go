package services

import (
	"api-chi/cmd/models"

	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_MovieDependMovieCategoryService(t *testing.T) {
	id := ""
	service := MovieDependMovieCategoryService{}

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

	t.Run("Create success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.MovieDependMovieCategory{
			MovieCategoryId: "360d60a6-3f3a-4c00-927a-04aa35410acc",
			MovieId:         "0bc66ff1-15ec-4d54-8830-1baf807b8091",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)

		// Assign value to id
		id = value
	})

	t.Run("Create same value must be failed prevent by trigger", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.MovieDependMovieCategory{
			MovieCategoryId: "360d60a6-3f3a-4c00-927a-04aa35410acc",
			MovieId:         "0bc66ff1-15ec-4d54-8830-1baf807b8091",
		}

		// Create database
		_, err = service.Create(&input)
		assert.Error(t, err)
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
