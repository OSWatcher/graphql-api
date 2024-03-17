FROM node:21

WORKDIR /app

# copy package.json to install deps
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of source
COPY . .

EXPOSE 4000

CMD ["npm", "run", "serve"]

