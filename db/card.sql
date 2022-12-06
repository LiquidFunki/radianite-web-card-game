-- CREATE DATABASE IF NOT EXISTS radianite;
-- USE radianite;
CREATE TABLE IF NOT EXISTS card (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description varchar(255) NOT NULL UNIQUE,
    type ENUM('damage', 'defense', 'heal', 'smoke', 'flash', 'ult') NOT NULL,
    power_points INT UNSIGNED NOT NULL,
    flash_chance INT UNSIGNED DEFAULT 0,
    price INT UNSIGNED NOT NULL,
    status ENUM('secret', 'public') NOT NULL DEFAULT 'public'
);