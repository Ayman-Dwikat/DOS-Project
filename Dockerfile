# Use the official Node.js image as the base image
FROM node as base

# Create a new image from the base image for the catalog service
FROM base as production
# Set /app as the working directory in the image
WORKDIR /app
# Update the package lists for upgrades for packages that need upgrading, as well as new packages that have just come to the repositories
RUN apt-get update && apt-get install -y sqlite3
# Copy package.json file from your source to the filesystem of the image at the working directory
COPY package.json . 
# Copy the nginx configuration files (if any)
COPY ./src/nginx .
# Install the dependencies defined in package.json
RUN npm install 
# Copy the catalog service source code to the image
COPY ./src/catalog-service .
# Expose port 3005 to have it mapped by the Docker daemon
EXPOSE 3005
# Define the command to run the catalog service
CMD ["npm","run","start-catalog"]

# Create a new image from the base image for the order service
FROM base as production1
WORKDIR /app
RUN apt-get update && apt-get install -y sqlite3
COPY package.json . 
COPY ./src/nginx .
RUN npm install 
COPY ./src/order-service .
EXPOSE 3006
CMD ["npm","run","start-order"]

# Create a new image from the base image for the client service
FROM base as client
WORKDIR /app
COPY package.json .
COPY ./src/nginx .
RUN npm install
COPY ./src/client-service .
CMD ["npm", "run" , "start-client"]
