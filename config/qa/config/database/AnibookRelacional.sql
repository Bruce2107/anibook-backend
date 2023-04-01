create database anibook_relacional;
use anibook_relacional;

-- STUDIO
  create table if not exists Studio(
    id serial not null,
    name text not null,
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertStudio(vName text)
    BEGIN
      INSERT INTO Studio (name) VALUES (vName);
    END $$
  DELIMITER ;

-- AUTHOR
  create table if not exists Author(
    id serial not null,
    name text not null,
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertAuthor(vName text)
    BEGIN
      INSERT INTO Author (name) VALUES (vName);
    END $$
  DELIMITER ;

-- IMAGE
  create table if not exists Image(
    id serial not null,
    name text not null,
    contentType text not null,
    image bytea null,
    folder text not null,
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertImage(vName text, vContentType text, vImage bytea, vFolder text)
    BEGIN
      INSERT INTO Image (name, contentType, image, folder) VALUES (vName,vContentType,vImage,vFolder);
    END $$
  DELIMITER ;

-- STATUS
  create table if not exists Status(
    id serial not null,
    value text not null,
    primary key(id)
  )

  DELIMITER $$
    CREATE PROCEDURE InsertStatus(vValue text)
    BEGIN
      INSERT INTO Status(value) VALUES (vValue)
    END $$
  DELIMITER ;
-- SERIE
  create table if not exists Serie(
    id serial not null,
    synopsis text not null,
    comment text not null,
    numberOfEpisodes integer not null,
    createdAt date not null,
    updatedAt date not null,
    primary key(id),
    foreign key (idStudio) references Studio(id), 
    foreign key (cover) references Image(id),
    foreign key (status) references Status(id),
  )

  DELIMITER $$
    CREATE PROCEDURE InsertSerie(vSynopsis text, vComment text, vStatus integer,
    vNumberOfEpisodes integer, vCreatedAt date, vUpdatedAt date, vCover integer, vIdStudio integer)
    BEGIN
      INSERT INTO Serie (synopsis, comment, status, numberOfEpisodes, createdAt, updatedAt, cover, idStudio) 
      VALUES (vSynopsis, vComment, vStatus, vNumberOfEpisodes, vCreatedAt, vUpdatedAt, vCover, vIdStudio);
    END $$
  DELIMITER ;

-- LANGUAGE
  create table if not exists Language(
    id serial not null,
    language text not null,
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertLanguage(vLanguage text)
    BEGIN
      INSERT INTO Language (language) VALUES (vLanguage);
    END $$
  DELIMITER ;

-- MUSIC
  create table if not exists Music(
    id serial not null,
    name text not null,
    link text not null,
    primary key(id),
    foreign key (idLanguage) references Language(id),
    foreign key (idSerie) references Serie(id),
  );

  DELIMITER $$
    CREATE PROCEDURE InsertMusic(vName text, vLink text, vIdLanguage integer, vIdSerie integer)
    BEGIN
      INSERT INTO Music (name, link, idLanguage, idSerie) VALUES (vName, vLink, vIdLanguage, vIdSerie);
    END $$
  DELIMITER ;

-- STREAMING
  create table if not exists Streaming(
    id serial not null,
    name text not null,
    link text not null,
    primary key(id),
  );

  DELIMITER $$
    CREATE PROCEDURE InsertStreaming(vName text, vLink text)
    BEGIN
      INSERT INTO Streaming (name, link) VALUES (vName, vLink);
    END $$
  DELIMITER ;

-- AUTHOR_SERIE
  create table if not exists Author_Serie(
    id serial not null,
    foreign key (idAuthor) references Author(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertAuthorSerie(vIdAuthor integer, vIdSerie integer)
    BEGIN
      INSERT INTO Author_Serie (idAuthor, idSerie) VALUES (vIdAuthor, vIdSerie);
    END $$
  DELIMITER ;

-- GALLERY
  create table if not exists Gallery(
    id serial not null,
    foreign key (idImage) references Image(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertGallery(vImage integer, vIdSerie integer)
    BEGIN
      INSERT INTO Gallery (idImage, idSerie) VALUES (vImage, vIdSerie);
    END $$
  DELIMITER ;

-- SERIE_STREAMING
  create table if not exists Serie_Streaming(
    id serial not null,
    foreign key (idStreaming) references Streaming(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertSerieStreaming(vIdSerie integer, vIdStreaming integer)
    BEGIN
      INSERT INTO Serie_Streaming (idSerie, idStreaming) VALUES (vIdSerie, vIdStreaming);
    END $$
  DELIMITER ;

-- STREAMING_LANGUAGE
  create table if not exists Streaming_Language(
    id serial not null,
    foreign key (idLanguage) references Language(id),
    foreign key (idStreaming) references Streaming(id),
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertStreamingLanguage(vIdStreaming integer, vIdLanguage integer)
    BEGIN
      INSERT INTO Streaming_Language (idStreaming, idLanguage) VALUES (vIdStreaming, vIdLanguage);
    END $$
  DELIMITER ;

-- USER
  create table if not exists User(
    id serial not null,
    nickname text not null,
    email text not null,
    primary key(id)
  );

  DELIMITER $$
    CREATE PROCEDURE InsertUser(vName text, vEmail text)
    BEGIN
      INSERT INTO User (nickname, email) VALUES (vName, vEmail);
    END $$
  DELIMITER ;

-- INSERT STUDIOS
  CALL InsertStudio("Aleph Producciones"); -- 1
  CALL InsertStudio("DMG Entertainment"); -- 2
  CALL InsertStudio("Orange Sky Golden Harvest"); -- 3
  CALL InsertStudio("Eskay Movies"); -- 4
  CALL InsertStudio("YNOT Studios"); -- 5
  CALL InsertStudio("Silverbird Film Distribution"); -- 6
  CALL InsertStudio("Lennauchfilm"); -- 7 nao usado
  CALL InsertStudio("Fingercuff Productions"); -- 8
  CALL InsertStudio("606 Films"); -- 9
  CALL InsertStudio("Filmology Finance"); -- 10 nao usado


-- INSERT AUTHORS
  CALL InsertAuthor("Alfred Hitchcock"); -- 1
  CALL InsertAuthor("Howard Hawks"); -- 2
  CALL InsertAuthor("Ingmar Bergman"); -- 3
  CALL InsertAuthor("Jean Renoir"); -- 4
  CALL InsertAuthor("Luis Bunuel"); -- 5
  CALL InsertAuthor("D.W. Griffith"); -- 6
  CALL InsertAuthor("George Cukor"); -- 7
  CALL InsertAuthor("Vincente Minnelli"); -- 8
  CALL InsertAuthor("Stanley Kubrick"); -- 9
  CALL InsertAuthor("Francois Truffaut"); -- 10

-- INSERT IMAGENS
  CALL InsertImage("capa","image/webp",null,"Serie 1") -- 1
  CALL InsertImage("image1","image/webp",null,"Serie 1") -- 2
  CALL InsertImage("image2","image/webp",null,"Serie 1") -- 3
  CALL InsertImage("capa2","image/webp",null,"Serie 2") -- 4
  CALL InsertImage("image2","image/webp",null,"Serie 2") -- 5
  CALL InsertImage("capa3","image/webp",null,"Serie 3") -- 6
  CALL InsertImage("capa4","image/webp",null,"Serie 4") -- 7
  CALL InsertImage("image1","image/webp",null,"Serie 5") -- 8
  CALL InsertImage("capa5","image/webp",null,"Serie 5") -- 9
  CALL InsertImage("image3","image/webp",null,"Serie 5") -- 10
  CALL InsertImage("image4","image/webp",null,"Serie 5") -- 11
  CALL InsertImage("image1","image/webp",null,"Serie 6") -- 12
  CALL InsertImage("capa6","image/webp",null,"Serie 6") -- 13
  CALL InsertImage("image1","image/webp",null,"Serie 7") -- 14
  CALL InsertImage("capa7","image/webp",null,"Serie 7") -- 15
  CALL InsertImage("capa8","image/webp",null,"Serie 8") -- 16
  CALL InsertImage("image10","image/webp",null,"Serie 8") -- 17
  CALL InsertImage("capa9","image/webp",null,"Serie 9") -- 18
  CALL InsertImage("image12","image/webp",null,"Serie 10") -- 19
  CALL InsertImage("capa10","image/webp",null,"Serie 10") -- 20

-- INSERT STATUS
  CALL InsertStatus("FINISHED"); -- 1
  CALL InsertStatus("NOT RELEASED YET"); -- 2
  CALL InsertStatus("ON GOING"); -- 3

-- INSERT SERIES
  CALL InsertSerie("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has"
    ,"the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty"
    ,1,12,NOW(), NOW(),1,1) -- 1
  CALL InsertSerie("fessor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,",
    "ou are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet te",
    2,0,NOW(), NOW(),4,2) -- 2
  CALL InsertSerie("The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    "Donec porttitor vitae nisi vel accumsan. Praesent rhoncus erat ut urna egestas, id malesuada urna pretium. Ut cursus, ex quis pretium tincidunt",
    3,5,NOW(), NOW(),6,3) -- 3
  CALL InsertSerie("Quisque sit amet ultricies lectus, sed mattis magna. Suspendisse eros ant",
    "Quisque sit amet ultricies lectus, sed mattis magna. Suspendisse eros ante, bibendum eu egestas non, interdum quis urna. Phasellus sed fermentum tellus, vitae dictum diam. Aliquam erat volutpat. Praesent dignissim libero quis purus eleifend condimentum. Donec elementum neque tellus, nec tempus purus scelerisque vel. Mauris egestas diam vel tellus sodales, ut tempor neque laoreet. Aenean ut venenatis odio. Curabitur sed ex blandit lorem mollis bibendum. ",
    1,36,NOW(), NOW(),7,4) -- 4
  CALL InsertSerie("Sed pharetra metus in dolor molestie molestie. ",
    "us faucibus venenatis. Integer auctor suscipit turpis, posuere egestas neque congue vitae. Pellentesque a vulputate ex, sit amet semper nisi. Morbi ultrices condimentum consequat. Eti",
    1,50,NOW(), NOW(),9,5) -- 5
  CALL InsertSerie("Integer ultrices cursus nisl, ac",
    "nd ipsum eu mollis aliquet. Nullam ac arcu vestibulum, pretium diam eget, vestibulum nisi. Aliquam tristique, elit at tempus tristique, velit diam luctus mauris, ut finibus ligula lacus eu ligula. Cras nisi augue, tincidunt ac orci in, tempus hendrerit lectus. Morbi tincidunt eleifend quam vel viverra. Cras eu so",
    1,21,NOW(), NOW(),13,6) -- 6
  CALL InsertSerie("Nullam quis libero iaculis urna malesuada pretium. ",
    "icies eget, pellentesque id metus. Phasellus eleifend, nisl ut faucibus finibus, leo odio scelerisque mauris, at sodales dui risus et ipsum. Nulla ipsum neque, bibe",
    3,11,NOW(), NOW(),15,8) -- 7
  CALL InsertSerie("Etiam eget placerat ante, id porttitor nunc",
    "Phasellus ligula leo, condimentum sed odio egestas, egestas interdum sem.",
    3,18,NOW(), NOW(),16,8) -- 8
  CALL InsertSerie("Ut maximus ultrices ornare.",
    "llentesque pretium orci, vitae sollicitudin purus luctus sit amet. Aliquam non risus commodo dui sollicitudin maximus ut vel enim. In lacinia hendrerit eros, a pretium neque ultricies et. In id nibh a diam dictum tincidunt vel sed ante. Donec et molestie magna. Nulla ultrices dignissim augue vel suscipit.",
    3,12,NOW(), NOW(),18,9) -- 9
  CALL InsertSerie("Maecenas justo sem, vulputate nec ipsum at, pellentesque pharetra arcu. ",
    " libero nec cursus. Etiam accumsan leo quis pretium pellentesque. Donec ultrices mi sed enim eleifend ullamcorper. Vivamus posuere purus quis lectus finibus, a ven",
    2,8,NOW(), NOW(),20,1) -- 10

-- INSERT LANGUAGE
  CALL InsertLanguage("Portuguese"); -- 1
  CALL InsertLanguage("English"); -- 2
  CALL InsertLanguage("Polish"); -- 3
  CALL InsertLanguage("Spanish"); -- 4
  CALL InsertLanguage("Arabic"); -- 5
  CALL InsertLanguage("Mandarin"); -- 6

-- INSERT MUSIC
  CALL InsertMusic("nameSong1","https://yt.be/nameSong1",1,1); -- 1
  CALL InsertMusic("nameSong2","https://yt.be/nameSong2",2,2); -- 2
  CALL InsertMusic("nameSong3","https://yt.be/nameSong3",3,2); -- 3
  CALL InsertMusic("nameSong4","https://yt.be/nameSong4",5,2); -- 4
  CALL InsertMusic("nameSong5","https://yt.be/nameSong5",4,3); -- 5
  CALL InsertMusic("nameSong6","https://yt.be/nameSong6",6,4); -- 6
  CALL InsertMusic("nameSong7","https://yt.be/nameSong7",1,5); -- 7
  CALL InsertMusic("nameSong8","https://yt.be/nameSong8",2,6); -- 8
  CALL InsertMusic("nameSong9","https://yt.be/nameSong9",1,7); -- 9
  CALL InsertMusic("nameSong10","https://yt.be/nameSong10",3,8); -- 10
  CALL InsertMusic("nameSong11","https://yt.be/nameSong11",4,9); -- 11
  CALL InsertMusic("nameSong12","https://yt.be/nameSong12",4,10); -- 12

-- INSERT STREAMING
  CALL InsertStreaming("netflix","https://netflix.com"); -- 1
  CALL InsertStreaming("hbomax","https://hbomax.com"); -- 2
  CALL InsertStreaming("amazon prime","https://primevideo.com"); -- 3
  CALL InsertStreaming("youtube","https://youtube.com"); -- 4
  CALL InsertStreaming("crunchyroll","https://crunchyroll.com"); -- 5
  CALL InsertStreaming("disney+","https://disneyplus.com"); -- 6
  CALL InsertStreaming("anime onegai","https://animeonegai.com"); -- 7