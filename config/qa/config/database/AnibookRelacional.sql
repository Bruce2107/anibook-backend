create database anibook_relacional;
use anibook_relacional;

create table if not exists Studio(
  id int not null auto_increment,
  name varchar(50) not null,
  primary key(id)
);

create table if not exists Author(
  id int not null auto_increment,
  name varchar(50) not null,
  primary key(id)
);

create table if not exists Image(
  id int not null auto_increment,
  name varchar(50) not null,
  contentType varchar(15) not null,
  image bytea not null,
  folder varchar(20) not null,
  primary key(id)
);

create table if not exists Serie(
  id int not null auto_increment,
  synopsis varchar(200) not null,
  comment varchar(500) not null,
  status int not null,
  numberOfEpisodes int not null,
  createdAt date not null,
  updatedAt not null,
  primary key(id),
  foreign key (idStudio) references Studio(id), 
  foreign key (cover) references Image(id), 
)

create table if not exists Language(
  id int not null auto_increment,
  language varchar(30) not null,
  primary key(id)
);

create table if not exists Music(
  id int not null auto_increment,
  name varchar(50) not null,
  link varchar(100) not null,
  primary key(id),
  foreign key (idLanguage) references Language(id),
  foreign key (idSerie) references Serie(id),
);

create table if not exists Streaming(
  id int not null auto_increment,
  name varchar(50) not null,
  link varchar(100) not null,
  primary key(id),
);

create table if not exists Author_Serie(
  id int not null auto_increment,
  foreign key (idAuthor) references Author(id),
  foreign key (idSerie) references Serie(id),
  primary key(id)
);

create table if not exists Gallery(
  id int not null auto_increment,
  foreign key (idImage) references Image(id),
  foreign key (idSerie) references Serie(id),
  primary key(id)
);

create table if not exists Serie_Streaming(
  id int not null auto_increment,
  foreign key (idStreaming) references Streaming(id),
  foreign key (idSerie) references Serie(id),
  primary key(id)
);

create table if not exists Streaming_Language(
  id int not null auto_increment,
  foreign key (idLanguage) references Language(id),
  foreign key (idStreaming) references Streaming(id),
  primary key(id)
);

create table if not exists User(
  id int not null auto_increment,
  name varchar(20) not null,
  email varchar(50) not null,
  password varchar(30) not null
  primary key(id)
);

DELIMITER $$
  CREATE PROCEDURE InsertStudio(vName varchar(50))
  BEGIN
    INSERT INTO Movie (name) VALUES (vName);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertAuthor(vName varchar(50))
  BEGIN
    INSERT INTO Movie (name) VALUES (vName);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertImage(vName varchar(50), vContentType varchar(15), vImage bytea, vFolder varchar(20))
  BEGIN
    INSERT INTO Movie (name, contentType, image, folder) VALUES (vName,vContentType,vImage,vFolder);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertSerie(vSynopsis varchar(200), vComment varchar(500), vStatus int,
  vNumberOfEpisodes int, vCreatedAt date, vUpdatedAt date, vCover int, vIdStudio int)
  BEGIN
    INSERT INTO Movie (synopsis, comment, status, numberOfEpisodes, createdAt, updatedAt, cover, idStudio) 
    VALUES (vSynopsis, vComment, vStatus, vNumberOfEpisodes, vCreatedAt, vUpdatedAt, vCover, vIdStudio);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertLanguage(vLanguage varchar(30))
  BEGIN
    INSERT INTO Movie (language) VALUES (vLanguage);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertMusic(vName varchar(50), vLink varchar(100), vIdLanguage int, vIdSerie int)
  BEGIN
    INSERT INTO Movie (name, link, idLanguage, idSerie) VALUES (vName, vLink, vIdLanguage, vIdSerie);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertStreaming(vName varchar(50), vLink varchar(100))
  BEGIN
    INSERT INTO Movie (name, link) VALUES (vName, vLink);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertAuthorSerie(vIdAuthor int, vIdSerie int)
  BEGIN
    INSERT INTO Movie (idAuthor, idSerie) VALUES (vIdAuthor, vIdSerie);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertGallery(vImage int, vIdSerie int)
  BEGIN
    INSERT INTO Movie (idImage, idSerie) VALUES (vImage, vIdSerie);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertSerieStreaming(vIdSerie int, vIdStreaming int)
  BEGIN
    INSERT INTO Movie (idSerie, idStreaming) VALUES (vIdSerie, vIdStreaming);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertStreamingLanguage(vIdStreaming, vIdLanguage)
  BEGIN
    INSERT INTO Movie (idStreaming, idLanguage) VALUES (vIdStreaming, vIdLanguage);
  END $$
DELIMITER ;

DELIMITER $$
  CREATE PROCEDURE InsertUser(vName varchar(20), vEmail varchar(50), vPassword varchar(30))
  BEGIN
    INSERT INTO Movie (name, email, password) VALUES (vName, vEmail, vPassword);
  END $$
DELIMITER ;

CALL InsertGender("Drama");