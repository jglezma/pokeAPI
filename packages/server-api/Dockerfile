FROM node as base

WORKDIR /var/www/server

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates yarn


COPY . .

RUN yarn install
RUN yarn run build

FROM node as release

WORKDIR /var/www/server

COPY --from=base /var/www/server/.env ./.env
COPY --from=base /var/www/server/dist ./dist
COPY --from=base /var/www/server/package.json ./package.json
COPY --from=base /var/www/server/yarn.lock ./yarn.lock

RUN yarn install --production

ENV MONGODB_URI="mongodb://127.0.0.1:27017/bgspokemon"

EXPOSE 3001

CMD ["node", "./dist/index.js"]