package services

import (
	"database/sql"
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

func GetUsersService(db *sql.DB) ([]User, error) {
	var users []User

	return users, nil
}
