-- migrate:up
INSERT  INTO record_types (type) VALUES ("손목 가동성"),("어깨 굴곡"),("어깨 신전"),("보행"),("호흡 균형")

-- migrate:down

TRUNCATE record_types;