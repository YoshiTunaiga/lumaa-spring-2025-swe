CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL  
);


CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id)
);