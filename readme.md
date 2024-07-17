<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

### О проекте

Демонстрация архитектурного подхода CQRS (команды и запросы), реализация общения микросервисов через брокера очередей на примере RabbitMQ

### Состав проекта

- Сервис пользователей со своей БД
- Сервис автомобилей со своей БД
- Брокер очередй RabbitMQ

### Развертка

1. Заходим в /rabbit
```
# Создать свой .env файл на основе .env.example
$ mv -v .env.example .env

# Теперь заполните файлы .env во всех 3-х каталогах своими настройками

# Запустить rabbit: 
$ docker-compose up -d
```
2. Заходим в /user-service
```
# Создать свой .env файл на основе .env.example
$ mv -v .env.example .env

# Установка пакетов
$ yarn install
$ yarn start:dev
```
3. Заходим в /car-service
```
# Создать свой .env файл на основе .env.example
$ mv -v .env.example .env

# Установка пакетов
$ yarn install
$ yarn start:dev
```
Примечание: при yarn start:dev генерация призма клиента и выполнение миграций произойдет автоматически

### Функционал

```
# Добавить нового пользователя через UserService
POST: localhost:3021/api/v1/user
{
    "userName": "Nest4",
    "userEmail": "nest@mail.ru",
    "userPhone": "79114877744"
}
# При этом создастся очередь на добавление базового автомобиля новому пользователю в CarService

# Выдать новый автомобиль пользователю через CarService
POST: localhost:3022/api/v1/car/attach
{
    "userId": 1,
    "carId": 2
}
# При этом создастся очередь на увеличение счетчика автомобилей в гараже пользователя в UserService

# Забрать автомобиль у пользователя через CarService
POST: localhost:3022/api/v1/car/detach
{
    "userId": 1,
    "carId": 2
}
# При этом создастся очередь на уменьлшение счетчика автомобилей в гараже пользователя в UserService
```