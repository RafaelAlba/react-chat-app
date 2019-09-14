FROM node:10

RUN apt-get clean \
    && apt-get update \
    && apt-get install -y mongodb-clients

WORKDIR /app

COPY . .

CMD ./entrypoint.sh
