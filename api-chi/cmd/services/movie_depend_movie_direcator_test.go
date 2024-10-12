package services

import (
	"api-chi/cmd/models"

	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_MovieDependMovieDirecatorService(t *testing.T) {
	id := ""
	service := MovieDependMovieDirecatorService{}

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
		input := models.MovieDependMovieDirecator{
			MovieDirecatorId: "436d3a76-c367-403d-bc98-c27fd0ae0413",
			MovieId:         "0bc66ff1-15ec-4d54-8830-1baf807b8091",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)

		// Assign value to id
		id = value
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
