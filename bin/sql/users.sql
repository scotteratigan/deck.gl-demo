DROP TABLE users;

CREATE TABLE users
(
  id serial,
  user_name character varying(50),
  -- user_type is either 'admin' or 'def'
  user_type character varying(5),
  -- permissions are 'active' or 'inactive' (consder user_is_active as boolean):
  user_permissions character varying(8),
  user_password character varying(50),
  user_date_active character varying(50)
);

INSERT INTO users
  (user_name, user_type, user_active, user_password, user_date_active)
VALUES
  ('scott', 'admin', TRUE, '123456', 'today');