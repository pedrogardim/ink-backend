FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the source code to the container
COPY . .

# Build TypeScript code
RUN npm run build

CMD [ "npm", "run", "docker:start"] 

