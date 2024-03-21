package config

import (
	"database/sql"
	_ "github.com/lib/pq"
)

func ConnectDB() (*sql.DB, error) {
	connStr := "host=localhost port=5432 user=postgres password=123456 dbname=creative_spark"
	return sql.Open("postgres", connStr)
}
