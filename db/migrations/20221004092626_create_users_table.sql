-- migrate:up

CREATE TABLE users (
  id int not null PRIMARY KEY AUTO_INCREMENT,
  name varchar(10) not null,
  birthday varchar(20) not null,
  height float not null,
  mobile_number varchar(20) not null,
  created_at DATETIME not null DEFAULT NOW(),
  is_active tinyint not null DEFAULT 1
);


-- migrate:down

DROP TABLE users;
