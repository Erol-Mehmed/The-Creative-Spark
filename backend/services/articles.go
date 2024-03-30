package services

import (
	"database/sql"
	"fmt"
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

func GetArticlesService(db *sql.DB) ([]Article, error) {
	var articles []Article

	rows, err := db.Query(`SELECT * FROM articles ORDER BY created_at DESC`)

	if err != nil {
		return nil, err
	}

	defer func() {
		if err := rows.Close(); err != nil {
			fmt.Println("Failed to close rows:", err)
		}
	}()

	fmt.Println("rows:", rows)

	for rows.Next() {
		var article Article
		if err := rows.Scan(&article.ID, &article.AuthorID, &article.Title, &article.Content, &article.Image, &article.ReadTime, &article.Claps, &article.Slug, &article.CreatedAt, &article.UpdatedAt); err != nil {
			return nil, err
		}
		articles = append(articles, article)
	}

	return articles, nil
}
