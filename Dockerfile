# build environment
FROM node:13.12.0-alpine
WORKDIR /usr/src/app
ENV GENERATE_SOURCEMAP false
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.2.0 -g --silent
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm start
