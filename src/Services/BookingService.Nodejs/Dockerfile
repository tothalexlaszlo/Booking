FROM node:alpine as base
WORKDIR /app
COPY src/Services/BookingService.Nodejs/package*.json ./
COPY src/Services/BookingService.Nodejs/tsconfig.json ./
RUN rm -rf node_modules && npm install && tsc --build
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
