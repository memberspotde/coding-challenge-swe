#!/bin/bash


command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# checking for Node.js and npm
if ! command_exists node || ! command_exists npm; then
    echo "Node.js and npm are required. Please install them first."
    exit 1
fi

# directories where the installs need to be done 
ROOT_DIR="$(pwd)"
ANGULAR_DIR="${ROOT_DIR}/angular-app/star-wars-library"

# Perform npm install in the root directory w/ dev just in caes
echo "Running npm install in the root directory..."
npm install --include=dev

# check for angular directory 
if [ -d "$ANGULAR_DIR" ]; then
    # Change to the Angular app directory and run npm install
    echo "Running npm install in the Angular app directory..."
    cd "$ANGULAR_DIR"
    npm install --include=dev
else
    echo "Angular app directory not found. Skipping npm install for Angular app."
fi

echo "Project setup completed successfully."

# Return to the root directory
cd "$ROOT_DIR"