package routes

import (
	"creative-spark/controllers"
	"database/sql"
	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App, db *sql.DB) {
	app.Get("/", func(c *fiber.Ctx) error {
		controllers.GetArticles(c, db)
		return nil
	})
}
