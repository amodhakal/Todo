FROM node
WORKDIR /src
COPY . .
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 5000