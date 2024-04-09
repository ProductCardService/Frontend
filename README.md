# Фронтенд

## Развертывание
Создание Docker-образа
```bash
docker build -t product-card-service/web:latest .
```
Запуск контейнера на основе Docker-образа
```bash
docker run --rm -p 8080:80 product-card-service/web:latest
```

## Разработка
Переменные окружения
```env
VITE_CARDS_API_HOST=http://127.0.0.1:7800
VITE_AI_GENERATOR_API_HOST=http://127.0.0.1:5555
VITE_MODE=dev
```

## Развертывание с использованием nginx
Переменные окружения (для контейнера устанавливается по умолчанию)
```env
VITE_MODE=production
```