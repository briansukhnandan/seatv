# Node JS v18 LTS
FROM node:18.16

WORKDIR /server
COPY . .

RUN npm ci
CMD ["npm", "run", "dev"]