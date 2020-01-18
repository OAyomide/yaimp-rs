package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "9000"
	}

	http.Handle("/", http.FileServer(http.Dir("./client/build")))
	log.Printf("SERVER UP AND RUNNING ON PORT %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
