CREATE TABLE IF NOT EXISTS users (
  	id SERIAL PRIMARY KEY,
  	first_name VARCHAR(50) NOT NULL,
  	last_name VARCHAR(50) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
    price REAL NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP WITH TIME ZONE,
    user_id INTEGER REFERENCES users(id)
);

INSERT INTO users(first_name, last_name, created_at) VALUES ('Ирина', 'Сергачук', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Олег', 'Иванов', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Петр', 'Тестовый', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Олег', 'Сидоров', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Иван', 'Иновов', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Игорь', 'Игорев', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Александр', 'Лушко', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Дарья', 'Савенкова', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Олег', 'Созыкин', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Алина', 'Аксёнова', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Алексей', 'Шмидт', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Андрей', 'Пастушенко', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Дарья', 'Чекалина', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Мария', 'Каримова', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Сергей', 'Петров', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Олег', 'Котов', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Сергей', 'Сергеев', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Анатолий', 'Касов', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Ирина', 'Сусьян', NOW());
INSERT INTO users(first_name, last_name, created_at) VALUES ('Игорь', 'Игорев', NOW());

INSERT INTO products(title, price, is_available, created_at, user_id) values('Тапочки одноразовые', 100, true, NOW(), 1);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Пушка тепловая Ресанта', 14332, false, NOW(), 2);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Конвектор SCARLETT', 1234, true, NOW(), 6);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Набор слаймов 20 цветов', 236, true, NOW(), 5);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Гель для стирки для всех видов тканей', 543, true, NOW(), 4);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Маркер для белых досок KORES черный', 543, false, NOW(), 3);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Картина по номерам 40х50 см', 543, false, NOW(), 10);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Маркер перманентный ATTACHE', 543, true, NOW(), 3);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Завеса электрическая воздушная', 543, true, NOW(), 13);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Картридж струйный Комус', 543, true, NOW(), 9);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Средство от насекомых РАПТОР Аэрозоль', 543, true, NOW(), 10);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Пароочиститель Кitfort', 543, true, NOW(), 19);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Клейкая лента канцелярская', 543, false, NOW(), 17);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Грузовая шина', 543, true, NOW(), 7);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Сумка-шоппер BRAUBERG', 543, true, NOW(), 20);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Набор полотенец махровых Ocean', 543, true, NOW(), 12);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Рукав полиуретановый плоскосворачиваемый', 543, false, NOW(), 15);
INSERT INTO products(title, price, is_available, created_at, user_id) values('Перчатки хозяйственные латексные BiColor', 543, true, NOW(), 18);