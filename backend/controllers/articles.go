package controllers

import (
	"creative-spark/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"time"
)

type Article struct {
	Title     string
	Content   string
	Image     string
	ReadTime  int
	Claps     int
	Slug      string
	CreatedAt time.Time
	UpdatedAt time.Time
	Author    struct {
		Name        string
		Image       string
		Description string
		Slug        string
	}
}

func GetArticles(c *gin.Context, db *gorm.DB) {
	var articles []Article
	articleInstance := Article{}
	originalArticles, _ := services.GetArticlesService(db)
	users, _ := services.GetUsersService(db)
	timeZeroValue := time.Time{}

	for i := 0; i < len(originalArticles); i++ {
		articleInstance.Title = originalArticles[i].Title
		articleInstance.Content = originalArticles[i].Content
		articleInstance.Image = originalArticles[i].Image
		articleInstance.ReadTime = originalArticles[i].ReadTime
		articleInstance.Claps = originalArticles[i].Claps
		articleInstance.Slug = originalArticles[i].Slug

		if articleInstance.UpdatedAt == timeZeroValue {
			articleInstance.CreatedAt = originalArticles[i].CreatedAt
		} else {
			articleInstance.UpdatedAt = originalArticles[i].UpdatedAt
		}

		for y := 0; y < len(users); y++ {
			if users[y].ID == originalArticles[i].AuthorID {
				articleInstance.Author.Name = users[y].Name
				articleInstance.Author.Image = users[y].Image
				articleInstance.Author.Description = users[y].Description
				articleInstance.Author.Slug = users[y].Slug
			}
		}

		articles = append(articles, articleInstance)
	}

	c.JSON(200, articles)
}
