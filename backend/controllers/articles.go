package controllers

import (
	"creative-spark/services"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func HasArticlesCheck(c *fiber.Ctx, db *gorm.DB) {
	hasArticles, _ := services.HasArticlesCheck(db)

	err := c.JSON(hasArticles)

	if err != nil {
		return
	}
}

func GetArticles(c *fiber.Ctx, db *gorm.DB) {
	articles, _ := services.GetArticlesService(db)

	err := c.JSON(articles)

	if err != nil {
		return
	}
}

func GetMostLikedArticles(c *fiber.Ctx, db *gorm.DB) {
	articles, _ := services.GetMostLikedArticles(db)

	err := c.JSON(articles)

	if err != nil {
		return
	}
}

func GetAuthorArticles(c *fiber.Ctx, db *gorm.DB, slug string) {
	articles, _ := services.GetAuthorArticles(db, slug)

	err := c.JSON(articles)

	if err != nil {
		return
	}
}
