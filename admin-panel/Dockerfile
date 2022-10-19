FROM node:lts-alpine

# RUN npm install -g @angular/cli

WORKDIR /app

#WORKDIR /usr/src/app

COPY package.json ./
# COPY package-lock.json .

RUN npm install -g @angular/cli
RUN npm install --force

# COPY . .

EXPOSE 4200

# CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck
CMD ["ng", "serve", "--host", "0.0.0.0"]