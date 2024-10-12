package main

import (
	"api-chi/cmd/config"
	"api-chi/cmd/routes"

	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	config.LoadApiConfig()
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	routes.MovieCategoryRoutes(r)
	routes.MovieDirecatorRoutes(r)

	err := http.ListenAndServe(":"+config.API_PORT, r)
	if err != nil {
		log.Fatal(err)
	}
}
