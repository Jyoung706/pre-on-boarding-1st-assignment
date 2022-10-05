-- migrate:up
CREATE TABLE records (
  id int not null PRIMARY KEY AUTO_INCREMENT,
  created_at DATETIME not null DEFAULT NOW(),
  weight float not null,
  user_id int not null,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down

DROP TABLE records;