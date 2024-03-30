package config

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func ConnectDB() (*sql.DB, error) {
	connectionString := "host=localhost user=postgres password=123456 dbname=creative_spark sslmode=disable"
	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		return nil, fmt.Errorf("failed to connect to the database: %w", err)
	}

	err = db.Ping()

	if err != nil {
		return nil, fmt.Errorf("failed to ping the database: %w", err)
	}

	return db, nil
}
