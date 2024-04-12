package models

import "time"

type Reply struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoincrement"`
	Author    string    `json:"author" gorm:"not null"`
	Content   string    `json:"content" gorm:"not null"`
	Claps     int       `json:"claps"`
	CreatedAt time.Time `json:"created_at" gorm:"not null;autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at"`
}
