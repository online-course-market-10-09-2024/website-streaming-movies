package routes

import (
	"api-chi/cmd/models"
	"api-chi/internal/message"

	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/stretchr/testify/assert"
)

func Test_MovieCategoryRoutes(t *testing.T) {
	r := chi.NewRouter()
	MovieCategoryRoutes(r)
	id := ""

	t.Run("Count success", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/movie-category/count", nil)
		res := httptest.NewRecorder()

		r.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Code)
		var response message.Response
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.GET_DATA_SUCCESS, response.Message)
		assert.NotNil(t, response.Data)
	})

	t.Run("GetAll success", func(t *testing.T) {
		search := ""
		limit := 10
		page := 1

		req := httptest.NewRequest("GET", fmt.Sprintf("/movie-category?search=%s&limit=%d&page=%d", search, limit, page), nil)
		res := httptest.NewRecorder()

		r.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Code)
		var response message.Response
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.GET_DATA_SUCCESS, response.Message)
		assert.NotNil(t, response.Data)
	})

	t.Run("Create success", func(t *testing.T) {
		input := models.MovieCategory{Name: "test tag"}
		body, _ := json.Marshal(input)

		req := httptest.NewRequest("POST", "/movie-category", bytes.NewBuffer(body))
		res := httptest.NewRecorder()

		r.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Code)
		var response message.Response
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.CREATE_DATA_SUCCESS, response.Message)
		assert.NotNil(t, response.Data)

		idValue, ok := response.Data.(string)
		if !ok {
			t.Fatalf("Expected response.Data to be of type string, got %T", response.Data)
		}
		id = idValue
	})

	t.Run("Update success", func(t *testing.T) {
		if id == "" {
			t.Fatal("ID must be set before running Update test")
		}

		input := models.MovieCategory{
			Id:   id,
			Name: "updated tag",
		}
		body, _ := json.Marshal(input)

		req := httptest.NewRequest("PATCH", "/movie-category", bytes.NewBuffer(body))
		res := httptest.NewRecorder()

		r.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Code)
		var response message.Response
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.UPDATE_DATA_SUCCESS, response.Message)
		assert.NotNil(t, response.Data)
	})

	t.Run("Remove success", func(t *testing.T) {
		if id == "" {
			t.Fatal("ID must be set before running Remove test")
		}

		req := httptest.NewRequest("DELETE", "/movie-category/"+id, nil)
		res := httptest.NewRecorder()

		r.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Code)
		var response message.Response
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.REMOVE_DATA_SUCCESS, response.Message)
	})
}
