DROP DATABASE IF EXISTS reservationsDB;
CREATE database reservationsDB;

USE reservationsDB;

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at datetime default now(),
  name VARCHAR(45) NULL,
  status VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  phone VARCHAR(45) NULL,
  reservation_datetime datetime NULL
);

INSERT INTO reservations (name, status, email, phone)
VALUES ("Darren", "active", "darren@gmail.com", "111-111-1111")
  , ("Nataly", "waitlist", "nataly@gmail.com", "222-222-2222")
  , ("Takeo", "canceled", "takeo@gmail.com", "333-333-3333");

SELECT * FROM reservations;
