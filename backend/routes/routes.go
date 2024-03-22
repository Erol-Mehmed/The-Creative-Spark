package routes

import (
	"creative-spark/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Router(db *gorm.DB) {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	v1 := router.Group("/api/v1")
	{
		v1.GET("/", func(c *gin.Context) {
			controllers.GetAllArticles(c, db)
		})
	}

	err := router.Run(":8080")

	if err != nil {
		return
	}
}
