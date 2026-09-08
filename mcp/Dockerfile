FROM node:25-alpine3.22

WORKDIR /app

# Build context is graphql-api/ root, so mcp files are under mcp/
COPY mcp/package*.json ./

RUN npm install

COPY mcp/ .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
