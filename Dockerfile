FROM nginx          
COPY ./build /usr/local/build
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
 