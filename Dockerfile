# Uses node version 22 as our base image
FROM node:22

WORKDIR /app

# Copy package.json and lock file first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port 5173
EXPOSE 5173

# Run dev server
CMD [ "npm", "run", "dev" ]
