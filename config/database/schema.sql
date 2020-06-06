CREATE TABLE IF NOT EXISTS animes (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);
CREATE TABLE IF NOT EXISTS mangas (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);
CREATE TABLE IF NOT EXISTS images (ID serial NOT NULL PRIMARY KEY, name text NOT NULL, folder text NOT NULL, "contentType" text NOT NULL, image bytea NOT NULL);
CREATE TABLE IF NOT EXISTS users (ID serial NOT NULL PRIMARY KEY, email text NOT NULL, nickname text NOT NULL);
