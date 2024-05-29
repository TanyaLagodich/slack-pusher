FROM node:20-alpine

LABEL maintainer="Tatiana Lagodich"

USER root

# Set the working directory
WORKDIR /usr/src/app

# Copy source code
COPY --chown=node:node package*.json ./

# Running npm install
RUN npm ci && npm cache clean --force

# Copy the rest of your app's source code from your host to your image filesystem.
COPY --chown=node:node . .

# Open the mapped port
EXPOSE 3000

CMD ["node", "index.js"]
