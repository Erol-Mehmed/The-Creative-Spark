package routes

import (
	"creative-spark/controllers"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Router(app *fiber.App, db *gorm.DB) {
	app.Get("/", func(c *fiber.Ctx) error {
		section := c.Query("section")

		if section == "all-articles" {
			controllers.GetArticles(c, db)
		} else {
			controllers.GetMostLikedArticles(c, db)
		}

		return nil
	})

	app.Get("/:slug", func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		controllers.GetAuthorArticles(c, db, slug)
		return nil
	})
}
