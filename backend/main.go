package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	logger := log.New(os.Stdout, "", log.LstdFlags)
	logger.Println("Backend service started.")

	// Set up signal handling
	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-signalChannel
		logger.Println("SIGTERM received, exiting...")
		os.Exit(0)
	}()

	// Run indefinitely
	for {
		time.Sleep(time.Second)
	}
}
