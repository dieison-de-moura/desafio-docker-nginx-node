FROM nginx:stable-alpine

# removendo o arquivo
RUN rm /etc/nginx/conf.d/default.conf

# carrega nosso arquivo para o container
COPY nginx.conf /etc/nginx/conf.d
