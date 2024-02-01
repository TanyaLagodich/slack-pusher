# Используем базовый образ Node.js
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в текущую директорию
COPY package*.json ./

# Устанавливаем зависимости приложения
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "index.js"]