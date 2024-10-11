# test-project
## Установка
```
git clone https://github.com/mustafaevf/test-project.git
```
### Директория проекта 
```
cd test-project
```
### Установить зависимости
```
cd client; npm install; cd ../server; npm install   
```
### sql-скрипт для создания БД с данными
```
psql -U <user> -f <file>
```
### Настройте окружение в server/.env
### Запуск сервера
```
cd server
npm start
```
### Запуск клиента
```
cd client
npm start
```