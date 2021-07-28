# pull official base image
FROM node:14

# set working directory
WORKDIR /appTimerEmployer



# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm","test","start"]
   