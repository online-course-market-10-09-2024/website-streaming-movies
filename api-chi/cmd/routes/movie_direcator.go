package routes

import (
	"api-chi/cmd/controllers"

	"github.com/go-chi/chi/v5"
)

func MovieDirecatorRoutes(r chi.Router) {
	controller := controllers.MovieDirecatorController{}

	r.Route("/movie-direcator", func(r chi.Router) {
		r.Get("/count", controller.Count)
		r.Get("/", controller.GetAll)
		r.Post("/", controller.Create)
		r.Patch("/", controller.Update)
		r.Delete("/{id}", controller.Remove)
	})
}
