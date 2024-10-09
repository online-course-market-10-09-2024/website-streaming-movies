package services

import (
	"api-chi/cmd/models"

	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_MovieDirecatorService(t *testing.T) {
	id := ""
	service := MovieDirecatorService{}

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
		input := models.MovieDirecator{
			Name: "test direcator",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)

		// Assign value to id
		id = value
	})

	t.Run("Update success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()

		// Declare input
		input := models.MovieDirecator{
			Id:   id,
			Name: "this is test direcator",
		}

		// Create database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Name, input.Name)
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

