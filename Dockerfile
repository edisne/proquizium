# Stage 1: Build the app
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the app with NGINX
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/proquizium/browser /usr/share/nginx/html
EXPOSE 80