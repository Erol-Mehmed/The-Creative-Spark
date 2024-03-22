package main

import (
	"creative-spark/config"
	"creative-spark/routes"
)

func main() {
	db, dbError := config.ConnectDB()

	if dbError != nil {
		return
	}

	routes.Router(db)
}
