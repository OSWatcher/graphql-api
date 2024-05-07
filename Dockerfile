FROM node:21

WORKDIR /app

# copy package.json to install deps
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of source
COPY . .
# pre-compile
RUN npm run build

EXPOSE 4000

# ENV DEBUG=@neo4j/graphql:execution
CMD ["npm", "run", "serve_from_build"]
