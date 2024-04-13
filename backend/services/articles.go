package services

import (
	"gorm.io/gorm"
	"time"
)

type Article struct {
	ID                uint      `json:"id"`
	AuthorID          uint      `json:"authorId"`
	Title             string    `json:"title"`
	Content           string    `json:"content"`
	Image             string    `json:"image"`
	ReadTime          int       `json:"readTime"`
	Claps             int       `json:"claps"`
	Topic             string    `json:"topic"`
	Slug              string    `json:"slug"`
	CreatedAt         time.Time `json:"createdAt"`
	UpdatedAt         time.Time `json:"updatedAt"`
	AuthorName        string    `gorm:"column:author_name" json:"authorName"`
	AuthorDescription string    `gorm:"column:author_description" json:"authorDescription"`
	AuthorImage       string    `gorm:"column:author_image" json:"authorImage"`
	AuthorSlug        string    `gorm:"column:author_slug" json:"authorSlug"`
}

func DoesArticleTableHaveEntries(db *gorm.DB) (bool, error) {
	var count int64

	err := db.Table("articles").Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func GetArticles(db *gorm.DB) ([]Article, error) {
	var articles []Article

	err := db.Raw(`
		SELECT
			articles.*,
			users.name AS author_name,
			users.description AS author_description,
			users.image AS author_image,
			users.slug AS author_slug
		FROM
		    articles
		JOIN
			users ON articles.author_id = users.id
	`).Scan(&articles).Error

	return articles, err
}

func GetArticle(db *gorm.DB, authorSlug string, articleSlug string) (Article, error) {
	var article Article

	err := db.Raw(`
		SELECT
			articles.*,
			users.name AS author_name,
			users.image AS author_image
		FROM
		    articles
		JOIN
			users ON articles.author_id = users.id
		WHERE
			users.slug = ? AND articles.slug = ?
	`, authorSlug, articleSlug).Scan(&article).Error

	return article, err
}

func GetMostLikedArticles(db *gorm.DB) ([]Article, error) {
	var articles []Article

	err := db.Raw(`
		SELECT
			articles.*,
			users.name AS author_name,
			users.description AS author_description,
			users.image AS author_image,
			users.slug AS author_slug
		FROM
		    articles
		JOIN
			users ON articles.author_id = users.id
		ORDER BY
			articles.claps DESC,
			articles.created_at DESC
		LIMIT 6
	`).Scan(&articles).Error

	return articles, err
}

func GetAuthorArticles(db *gorm.DB, slug string) ([]Article, error) {
	var articles []Article

	err := db.Raw(`
		SELECT
			articles.*,
			users.name AS author_name,
			users.description AS author_description,
			users.image AS author_image
		FROM
		    articles
		JOIN
			users ON articles.author_id = users.id
		WHERE
			users.slug = ?
		ORDER BY
		    articles.created_at DESC
	`, slug).Scan(&articles).Error

	return articles, err
}
