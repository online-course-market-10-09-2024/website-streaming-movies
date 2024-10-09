package config

import (
	"context"
	"os"
)

var CTX context.Context = context.Background()

var (
	// Postgresql database config
	POSTGRES_USERNAME string
	POSTGRES_PASSWORD string
	POSTGRES_HOST     string
	POSTGRES_PORT     string
	POSTGRES_DATABASE string
	POSTGRES_URL      string
)

func LoadConfig() {
	POSTGRES_USERNAME = os.Getenv("POSTGRES_USERNAME")
	POSTGRES_PASSWORD = os.Getenv("POSTGRES_PASSWORD")
	POSTGRES_HOST = os.Getenv("POSTGRES_HOST")
	POSTGRES_PORT = os.Getenv("POSTGRES_PORT")
	POSTGRES_DATABASE = os.Getenv("POSTGRES_DATABASE")
	POSTGRES_URL = "postgres://" + POSTGRES_USERNAME + ":" +
		POSTGRES_PASSWORD + "@" + POSTGRES_HOST + ":" +
		POSTGRES_PORT + "/" + POSTGRES_DATABASE + "?sslmode=disable"
}

