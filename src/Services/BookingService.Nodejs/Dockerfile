FROM node:alpine as base

WORKDIR /app

COPY src/Services/BookingService.Nodejs/package.json ./

RUN rm -rf node_modules && npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
