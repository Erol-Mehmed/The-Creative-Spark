package services

import (
	"fmt"
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID          uint
	Name        string
	Email       string
	Password    string
	Image       string
	Description string
	Slug        string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func GetUsersService(db *gorm.DB) ([]User, error) {
	var users []User

	result := db.Find(&users)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to retrieve users: %w", result.Error)
	}

	return users, nil
}
