package models

import "time"

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey;autoincrement"`
	Name        string    `json:"name" gorm:"not null"`
	Email       string    `json:"email" gorm:"not null;unique"`
	Password    string    `json:"password" gorm:"not null"`
	Image       string    `json:"image"`
	Description string    `json:"description" gorm:"not null"`
	Slug        string    `json:"slug" gorm:"not null;unique"`
	CreatedAt   time.Time `json:"created_at" gorm:"not null;autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at"`
}
