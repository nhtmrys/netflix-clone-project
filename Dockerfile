# Base image
FROM node:18-alpine

# Uygulamanızın bulunduğu dizini Docker içinde oluşturun
WORKDIR /app

# Uygulamanızın bağımlılıklarını yükleyin
COPY package*.json ./
RUN npm install

# Uygulamanızın kodlarını Docker içine kopyalayın
COPY . .

# Uygulamanızı build edin
RUN npm run build

# Uygulamanızı çalıştırın
CMD ["npm", "start"]
