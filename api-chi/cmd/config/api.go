package config

import (
	"os"
)

var (
	API_PORT string
)

func LoadApiConfig() {
	API_PORT = os.Getenv("API_PORT")
}