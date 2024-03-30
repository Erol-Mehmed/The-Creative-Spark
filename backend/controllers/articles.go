package controllers

import (
	"creative-spark/services"
	"database/sql"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func GetArticles(c *fiber.Ctx, db *sql.DB) {
	fmt.Println(services.GetArticlesService(db))

	//err := c.JSON(articles)

	//if err != nil {
	//	return
	//}
}
