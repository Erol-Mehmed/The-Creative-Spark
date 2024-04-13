package controllers

import (
	"creative-spark/services"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func DoesArticleTableHaveEntries(c *fiber.Ctx, db *gorm.DB) {
	hasArticles, _ := services.DoesArticleTableHaveEntries(db)

	err := c.JSON(hasArticles)

	if err != nil {
		return
	}
}

func GetArticles(c *fiber.Ctx, db *gorm.DB) {
	articles, _ := services.GetArticles(db)

	err := c.JSON(articles)

	if err != nil {
		return
	}
}

func GetArticle(c *fiber.Ctx, db *gorm.DB, authorSlug string, articleSlug string) {
	article, _ := services.GetArticle(db, authorSlug, articleSlug)

	err := c.JSON(article)

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
