-- migrate:up
CREATE TABLE record_types (
  id int not null PRIMARY KEY AUTO_INCREMENT,
  type varchar(30) not null
);

-- migrate:down

DROP TABLE record_types;