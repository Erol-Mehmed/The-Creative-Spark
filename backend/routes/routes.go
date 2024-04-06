package routes

import (
	"creative-spark/controllers"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Router(app *fiber.App, db *gorm.DB) {
	app.Get("/", func(c *fiber.Ctx) error {
		controllers.GetArticles(c, db)
		return nil
	})
}
