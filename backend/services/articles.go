package services

import (
	"gorm.io/gorm"
	"time"
)

type Article struct {
	ID          uint
	AuthorID    uint
	Title       string
	Content     string
	Image       string
	ReadTime    int
	Claps       int
	Slug        string
	AuthorName  string `gorm:"column:author_name"`
	AuthorImage string `gorm:"column:author_image"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func GetArticlesService(db *gorm.DB) ([]Article, error) {
	var articles []Article

	err := db.Raw(`
		SELECT
			articles.*,
			users.name AS author_name,
			users.image AS author_image
		FROM
		    articles
		JOIN
			users ON articles.author_id = users.id
	`).Scan(&articles).Error

	return articles, err
}
