FROM node:18
WORKDIR /app
COPY ./package*.json ./
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx","serve","-s","build"]