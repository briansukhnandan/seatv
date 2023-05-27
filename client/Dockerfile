# Node JS v18 LTS
FROM node:18.16

WORKDIR /client
COPY . .

RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "start"]