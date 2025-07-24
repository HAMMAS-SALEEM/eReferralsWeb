FROM node:lts-alpine as build

WORKDIR /app

COPY . ./
RUN npm install

ADD "http://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache

# Force rebuild
RUN npm run build -- --mode production

FROM nginx:stable-alpine as deploy

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /var/www/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]