package main

import (
	"creative-spark/config"
	"creative-spark/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	db, dbError := config.ConnectDB()

	if dbError != nil {
		log.Fatalf("Failed to connect to the database: %v", dbError)
	} else {
		log.Println("Connected to the database")
	}

	routes.Router(app, db)

	_ = app.Listen(":8080")
}
