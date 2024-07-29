#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# check again if node exists 
if ! command_exists node || ! command_exists npm || ! command_exists ng; then
    echo "Node.js, npm, and Angular CLI are required. Please install them first."
    exit 1
fi

# directories where the runs need to be done 
ROOT_DIR="$(pwd)"
ANGULAR_DIR="${ROOT_DIR}/angular-app/star-wars-library"


start_backend() {
    echo "Starting the backend..."
    cd "$ROOT_DIR"
    npm run dev &  # 
    BACKEND_PID=$!
    echo "Backend started with PID $BACKEND_PID"
}


start_frontend() {
    echo "Starting the Angular frontend..."
    cd "$ANGULAR_DIR"
    ng serve --open &  #open the default web browser as well 
    FRONTEND_PID=$!
    echo "Angular frontend started with PID $FRONTEND_PID"
}

# start both
start_backend
sleep 5  # 
start_frontend

# do we need to wait ? 
wait $BACKEND_PID
wait $FRONTEND_PID

echo "Both backend and frontend are running."
