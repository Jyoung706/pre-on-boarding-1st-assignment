-- migrate:up
CREATE TABLE record_data (
  id int not null PRIMARY KEY AUTO_INCREMENT,
  record_id int not null,
  record_type_id int not null,
  data int not null,
  FOREIGN KEY (record_id) REFERENCES records(id) ON DELETE CASCADE,
  FOREIGN KEY (record_type_id) REFERENCES record_types(id)
);

-- migrate:down

DROP TABLE record_data;