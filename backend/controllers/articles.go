package controllers

import "github.com/gin-gonic/gin"

func GetAllArticles(c *gin.Context) {
	type ArticleStruct struct {
		Title     string
		Content   string
		Topic     string
		Image     string
		Claps     int
		ReadTime  int
		CreatedAt string
	}

	article := ArticleStruct{
		Title:     "How to build Angular apps",
		Content:   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		Topic:     "technology",
		Image:     "https://via.placeholder.com/150",
		Claps:     14,
		ReadTime:  5,
		CreatedAt: "Mar 16, 2024",
	}

	c.JSON(200, gin.H{
		"article": article,
	})
}
