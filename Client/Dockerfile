FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose CRA default port
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
