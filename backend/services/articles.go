package services

import (
	"fmt"
	"gorm.io/gorm"
	"time"
)

type Article struct {
	ID        uint
	AuthorID  uint
	Title     string
	Content   string
	Image     string
	ReadTime  int
	Claps     int
	Slug      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func GetArticlesService(db *gorm.DB) ([]Article, error) {
	var articles []Article

	result := db.Find(&articles)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to retrieve articles: %w", result.Error)
	}

	return articles, nil
}
