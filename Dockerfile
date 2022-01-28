#Pull down node image version 16
FROM node:16

# Create app directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]