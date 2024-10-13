package routes

import (
	"api-chi/cmd/controllers"

	"github.com/go-chi/chi/v5"
)

func MovieDirectorRoutes(r chi.Router) {
	controller := controllers.MovieDirectorController{}

	r.Route("/movie-director", func(r chi.Router) {
		r.Get("/count", controller.Count)
		r.Get("/", controller.GetAll)
		r.Post("/", controller.Create)
		r.Patch("/", controller.Update)
		r.Delete("/{id}", controller.Remove)
	})
}
