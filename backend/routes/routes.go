package routes

import (
	"creative-spark/controllers"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"strconv"
)

func Router(app *fiber.App, db *gorm.DB) {
	app.Get("/", func(c *fiber.Ctx) error {
		section := c.Query("section")
		hasArticles, _ := strconv.ParseBool(c.Query("hasArticles"))

		if hasArticles {
			controllers.DoesArticleTableHaveEntries(c, db)
		} else if section == "all-articles" {
			controllers.GetArticles(c, db)
		} else {
			controllers.GetMostLikedArticles(c, db)
		}

		return nil
	})

	app.Get("/author", func(c *fiber.Ctx) error {
		author := c.Query("author")
		controllers.GetAuthorArticles(c, db, author)

		return nil
	})

	app.Get("/article-details", func(c *fiber.Ctx) error {
		author := c.Query("authorSlug")
		article := c.Query("articleSlug")

		controllers.GetArticle(c, db, author, article)

		return nil
	})
}
