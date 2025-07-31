FROM node:18

WORKDIR /app

COPY server.js ./
COPY public ./public

RUN mkdir -p public/live

RUN apt-get update && apt-get install -y ffmpeg

RUN npm init -y && npm install express

EXPOSE 10000

CMD ["node", "server.js"]
