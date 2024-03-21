package models

type Article struct {
	ID        uint   `json:"id"`
	AuthorID  uint   `json:"author_id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Image     string `json:"image"`
	ReadTime  int    `json:"read_time"`
	Claps     int    `json:"claps"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
