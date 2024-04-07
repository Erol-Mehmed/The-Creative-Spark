package models

import "time"

type Article struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoincrement"`
	AuthorID  uint      `json:"author_id" gorm:"foreignKey;references:users(id)"`
	Title     string    `json:"title" gorm:"not null"`
	Content   string    `json:"content" gorm:"not null"`
	Image     string    `json:"image"`
	ReadTime  int       `json:"read_time" gorm:"not null"`
	Claps     int       `json:"claps"`
	Topic     string    `json:"topic" gorm:"not null"`
	Slug      string    `json:"slug" gorm:"not null;unique"`
	CreatedAt time.Time `json:"created_at" gorm:"not null;autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at"`
}
