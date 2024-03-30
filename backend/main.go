package main

import (
	"creative-spark/config"
	"creative-spark/routes"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	app := fiber.New()

	db, dbError := config.ConnectDB()

	if dbError != nil {
		log.Fatalf("Failed to connect to the database: %v", dbError)
	} else {
		log.Println("Connected to the database")
	}

	routes.Router(app, db)

	_ = app.Listen(":8080")
}
