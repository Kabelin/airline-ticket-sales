FROM node:12

# Create app directory
WORKDIR /usr

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .sequelizerc ./

# Building code for production
RUN npm install --production

# Bundle app
COPY bundle ./src

EXPOSE 5000

CMD [ "node", "src/server.js" ]
