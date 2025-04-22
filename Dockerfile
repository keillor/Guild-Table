# Use the official Node.js image as the base image
FROM node:23.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the SvelteKit project
RUN npm run build

# Change to the build directory
WORKDIR /app/build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index"]