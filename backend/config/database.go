package config

import (
	"creative-spark/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open("host=localhost user=postgres password=123456 dbname=creative_spark"), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	autoMigrateError := db.AutoMigrate(&models.User{}, &models.Article{}, &models.Comment{}, &models.Reply{})

	if autoMigrateError != nil {
		return nil, autoMigrateError
	}

	return db, nil
}
