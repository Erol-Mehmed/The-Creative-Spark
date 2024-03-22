package models

import "time"

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey;autoincrement"`
	Name        string    `json:"name"`
	Email       string    `json:"email" gorm:"unique"`
	Password    string    `json:"password"`
	Image       string    `json:"image"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at"`
}
