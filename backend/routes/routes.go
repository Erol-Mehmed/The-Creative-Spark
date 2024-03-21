package routes

import (
	"creative-spark/config"
	"creative-spark/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Router() {
	router := gin.Default()
	dbError, _ := config.ConnectDB()
	if dbError != nil {
		return
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	v1 := router.Group("/api/v1")
	{
		v1.GET("/", controllers.GetAllArticles)
	}

	err := router.Run(":8080")
	if err != nil {
		return
	}
}
