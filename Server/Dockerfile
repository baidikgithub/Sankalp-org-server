# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project files
COPY . .

# Expose port (match the one used in your server.js, usually 5000 or 3000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
