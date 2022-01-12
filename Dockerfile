FROM node:latest
WORKDIR /usr/src/app
RUN npm install @google/clasp -g