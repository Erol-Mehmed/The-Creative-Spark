package controllers

import (
	"creative-spark/services"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetArticles(c *fiber.Ctx, db *gorm.DB) {
	articles, _ := services.GetArticlesService(db)

	err := c.JSON(articles)

	if err != nil {
		return
	}
}
