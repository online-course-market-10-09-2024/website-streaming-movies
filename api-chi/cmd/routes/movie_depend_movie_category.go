package routes

import (
	"api-chi/cmd/controllers"

	"github.com/go-chi/chi/v5"
)

func MovieDependMovieCategoryRoutes(r chi.Router) {
	controller := controllers.MovieDependMovieCategoryController{}

	r.Route("/movie-depend-movie-category", func(r chi.Router) {
		r.Get("/count", controller.Count)
		r.Post("/", controller.Create)
		r.Delete("/{id}", controller.Remove)
	})
}
