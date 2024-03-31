# Base image.
FROM node:18-alpine

# Set the Enviournment to production
ENV NODE_ENV=production

# Create app directory.
WORKDIR /usr/src/app

# A wildcard is used to copy package.json AND package-lock.json.
COPY package*.json ./

# Install nestjs which is required for bulding the Nest.js project.
RUN npm install -g @nestjs/cli

# Installs only the dependencies and skips devDependencies.
RUN npm install --omit=dev

# Copy all the files to the container.
COPY . .

# Run the tests.
RUN npm run test

# Create a "dist" folder with the production build.
RUN npm run build

# Start the server using the production build:
CMD [ "node", "dist/main.js" ]

# Expose port 5000 of your server.
EXPOSE 5000