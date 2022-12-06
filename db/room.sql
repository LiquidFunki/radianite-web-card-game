CREATE TABLE IF NOT EXISTS room (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    player1 VARCHAR(255) DEFAULT NULL,
    player2 varchar(255) DEFAULT NULL,
    status ENUM('active', 'waiting') NOT NULL  DEFAULT 'waiting'
); 