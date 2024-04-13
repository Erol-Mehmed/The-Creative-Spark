package models

import "time"

type Comment struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoincrement"`
	Author    string    `json:"author" gorm:"not null"`
	Content   string    `json:"content" gorm:"not null"`
	Claps     int       `json:"claps"`
	Replies   int       `json:"replies"`
	CreatedAt time.Time `json:"created_at" gorm:"not null;autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at"`
}
