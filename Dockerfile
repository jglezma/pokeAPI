FROM node as client

ENV REACT_APP_POKEAPI_URL="https://pokeapi.co/api/v2/"
ENV REACT_APP_SERVER_URL="http://localhost:3001/api/pokemon"
ENV REACT_APP_SERVER_SOCKET="http://localhost:3001"

WORKDIR /var/www/web-client

COPY ./packages/web-client .

RUN yarn install
RUN yarn run build

FROM nginx:alpine as release

COPY --from=client /var/www/web-client/build /var/www/pokemon

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf