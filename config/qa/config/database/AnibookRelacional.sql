-- STUDIO
  create table if not exists Studio(
    id serial not null,
    name text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertStudio(vName text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Studio (name) VALUES (vName);
  $$;

-- AUTHOR
  create table if not exists Author(
    id serial not null,
    name text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertAuthor(vName text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Author (name) VALUES (vName);
  $$;

-- IMAGE
  create table if not exists Image(
    id serial not null,
    name text not null,
    "contentType" text not null,
    image bytea null,
    folder text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertImage(vName text, vContentType text, vImage bytea, vFolder text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Image (name, "contentType", image, folder) VALUES (vName,vContentType,vImage,vFolder);
  $$;

-- STATUS
  create table if not exists Status(
    id serial not null,
    value text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertStatus(vValue text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Status(value) VALUES (vValue)
  $$;

-- SERIE
  create table if not exists Serie(
    id serial not null,
    name text not null,
    synopsis text not null,
    comment text not null,
    numberOfEpisodes integer not null,
    createdAt timestamp not null,
    updatedAt timestamp not null,
    idStudio integer not null,
    cover integer not null,
    status integer not null,
    primary key(id),
    foreign key (idStudio) references Studio(id), 
    foreign key (cover) references Image(id),
    foreign key (status) references Status(id)
  );

  CREATE OR REPLACE PROCEDURE InsertSerie(vName text, vSynopsis text, vComment text, vStatus integer,
  vNumberOfEpisodes integer, vCreatedAt timestamp, vUpdatedAt timestamp, vCover integer, vIdStudio integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Serie (name, synopsis, comment, status, numberOfEpisodes, createdAt, updatedAt, cover, idStudio) 
    VALUES (vName, vSynopsis, vComment, vStatus, vNumberOfEpisodes, vCreatedAt, vUpdatedAt, vCover, vIdStudio);
  $$;

-- LANGUAGE
  create table if not exists Language(
    id serial not null,
    language text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertLanguage(vLanguage text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Language (language) VALUES (vLanguage);
  $$;

-- MUSIC
  create table if not exists Music(
    id serial not null,
    name text not null,
    link text not null,
    idLanguage integer not null,
    idSerie integer not null,
    primary key(id),
    foreign key (idLanguage) references Language(id),
    foreign key (idSerie) references Serie(id)
  );

  CREATE OR REPLACE PROCEDURE InsertMusic(vName text, vLink text, vIdLanguage integer, vIdSerie integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Music (name, link, idLanguage, idSerie) VALUES (vName, vLink, vIdLanguage, vIdSerie);
  $$;

-- STREAMING
  create table if not exists Streaming(
    id serial not null,
    name text not null,
    link text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertStreaming(vName text, vLink text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Streaming (name, link) VALUES (vName, vLink);
  $$;

-- AUTHOR_SERIE
  create table if not exists Author_Serie(
    id serial not null,
    idAuthor integer not null,
    idSerie integer not null,
    foreign key (idAuthor) references Author(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertAuthorSerie(vIdAuthor integer, vIdSerie integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Author_Serie (idAuthor, idSerie) VALUES (vIdAuthor, vIdSerie);
  $$;

-- GALLERY
  create table if not exists Gallery(
    id serial not null,
    idImage integer not null,
    idSerie integer not null,
    foreign key (idImage) references Image(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertGallery(vImage integer, vIdSerie integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Gallery (idImage, idSerie) VALUES (vImage, vIdSerie);
  $$;

-- SERIE_STREAMING
  create table if not exists Serie_Streaming(
    id serial not null,
    idStreaming integer not null,
    idSerie integer not null,
    foreign key (idStreaming) references Streaming(id),
    foreign key (idSerie) references Serie(id),
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertSerieStreaming(vIdSerie integer, vIdStreaming integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Serie_Streaming (idSerie, idStreaming) VALUES (vIdSerie, vIdStreaming);
  $$;

-- STREAMING_LANGUAGE
  create table if not exists Streaming_Language(
    id serial not null,
    idStreaming integer not null,
    idLanguage integer not null,
    foreign key (idLanguage) references Language(id),
    foreign key (idStreaming) references Streaming(id),
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertStreamingLanguage(vIdStreaming integer, vIdLanguage integer)
  LANGUAGE SQL
  AS $$
    INSERT INTO Streaming_Language (idStreaming, idLanguage) VALUES (vIdStreaming, vIdLanguage);
  $$;

-- USER
  create table if not exists Users(
    id serial not null,
    nickname text not null,
    email text not null,
    primary key(id)
  );

  CREATE OR REPLACE PROCEDURE InsertUser(vName text, vEmail text)
  LANGUAGE SQL
  AS $$
    INSERT INTO Users (nickname, email) VALUES (vName, vEmail);
  $$;

-- INSERT STUDIOS
  CALL InsertStudio('Aleph Producciones'); -- 1
  CALL InsertStudio('DMG Entertainment'); -- 2
  CALL InsertStudio('Orange Sky Golden Harvest'); -- 3
  CALL InsertStudio('Eskay Movies'); -- 4
  CALL InsertStudio('YNOT Studios'); -- 5
  CALL InsertStudio('Silverbird Film Distribution'); -- 6
  CALL InsertStudio('Lennauchfilm'); -- 7 nao usado
  CALL InsertStudio('Fingercuff Productions'); -- 8
  CALL InsertStudio('606 Films'); -- 9
  CALL InsertStudio('Filmology Finance'); -- 10 nao usado

-- INSERT AUTHORS
  CALL InsertAuthor('Alfred Hitchcock'); -- 1
  CALL InsertAuthor('Howard Hawks'); -- 2
  CALL InsertAuthor('Ingmar Bergman'); -- 3
  CALL InsertAuthor('Jean Renoir'); -- 4
  CALL InsertAuthor('Luis Bunuel'); -- 5
  CALL InsertAuthor('D.W. Griffith'); -- 6
  CALL InsertAuthor('George Cukor'); -- 7
  CALL InsertAuthor('Vincente Minnelli'); -- 8
  CALL InsertAuthor('Stanley Kubrick'); -- 9
  CALL InsertAuthor('Francois Truffaut'); -- 10 nau usado

-- INSERT IMAGENS
  CALL InsertImage('capa','image/webp',null,'Serie 1'); -- 1
  CALL InsertImage('image1','image/webp',null,'Serie 1'); -- 2
  CALL InsertImage('image2','image/webp',null,'Serie 1'); -- 3
  CALL InsertImage('capa2','image/webp',null,'Serie 2'); -- 4
  CALL InsertImage('image2','image/webp',null,'Serie 2'); -- 5
  CALL InsertImage('capa3','image/webp',null,'Serie 3'); -- 6
  CALL InsertImage('capa4','image/webp',null,'Serie 4'); -- 7
  CALL InsertImage('image1','image/webp',null,'Serie 5'); -- 8
  CALL InsertImage('capa5','image/webp',null,'Serie 5'); -- 9
  CALL InsertImage('image3','image/webp',null,'Serie 5'); -- 10
  CALL InsertImage('image4','image/webp',null,'Serie 5'); -- 11
  CALL InsertImage('image1','image/webp',null,'Serie 6'); -- 12
  CALL InsertImage('capa6','image/webp',null,'Serie 6'); -- 13
  CALL InsertImage('image1','image/webp',null,'Serie 7'); -- 14
  CALL InsertImage('capa7','image/webp',null,'Serie 7'); -- 15
  CALL InsertImage('capa8','image/webp',null,'Serie 8'); -- 16
  CALL InsertImage('image10','image/webp',null,'Serie 8'); -- 17
  CALL InsertImage('capa9','image/webp',null,'Serie 9'); -- 18
  CALL InsertImage('image12','image/webp',null,'Serie 10'); -- 19
  CALL InsertImage('capa10','image/webp',null,'Serie 10'); -- 20

-- INSERT STATUS
  CALL InsertStatus('FINISHED'); -- 1
  CALL InsertStatus('NOT RELEASED YET'); -- 2
  CALL InsertStatus('ON GOING'); -- 3

-- INSERT SERIES
  CALL InsertSerie('Serie1',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has'
    ,'the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty'
    ,1,12,now()::timestamp, now()::timestamp,1,1); -- 1
  CALL InsertSerie('Serie2',
    'fessor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,',
    'ou are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet te',
    2,0,now()::timestamp, now()::timestamp,4,2); -- 2
  CALL InsertSerie('Serie3',
    'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
    'Donec porttitor vitae nisi vel accumsan. Praesent rhoncus erat ut urna egestas, id malesuada urna pretium. Ut cursus, ex quis pretium tincidunt',
    3,5,now()::timestamp, now()::timestamp,6,3); -- 3
  CALL InsertSerie('Serie4',
    'Quisque sit amet ultricies lectus, sed mattis magna. Susp$$isse eros ant',
    'Quisque sit amet ultricies lectus, sed mattis magna. Susp$$isse eros ante, bib$$um eu egestas non, interdum quis urna. Phasellus sed fermentum tellus, vitae dictum diam. Aliquam erat volutpat. Praesent dignissim libero quis purus eleif$$ condimentum. Donec elementum neque tellus, nec tempus purus scelerisque vel. Mauris egestas diam vel tellus sodales, ut tempor neque laoreet. Aenean ut venenatis odio. Curabitur sed ex blandit lorem mollis bib$$um. ',
    1,36,now()::timestamp, now()::timestamp,7,4); -- 4
  CALL InsertSerie('Serie5',
    'Sed pharetra metus in dolor molestie molestie. ',
    'us faucibus venenatis. Integer auctor suscipit turpis, posuere egestas neque congue vitae. Pellentesque a vulputate ex, sit amet semper nisi. Morbi ultrices condimentum consequat. Eti',
    1,50,now()::timestamp, now()::timestamp,9,5); -- 5
  CALL InsertSerie('Serie6',
    'Integer ultrices cursus nisl, ac',
    'nd ipsum eu mollis aliquet. Nullam ac arcu vestibulum, pretium diam eget, vestibulum nisi. Aliquam tristique, elit at tempus tristique, velit diam luctus mauris, ut finibus ligula lacus eu ligula. Cras nisi augue, tincidunt ac orci in, tempus h$$rerit lectus. Morbi tincidunt eleif$$ quam vel viverra. Cras eu so',
    1,21,now()::timestamp, now()::timestamp,13,6); -- 6
  CALL InsertSerie('Serie7',
    'Nullam quis libero iaculis urna malesuada pretium. ',
    'icies eget, pellentesque id metus. Phasellus eleif$$, nisl ut faucibus finibus, leo odio scelerisque mauris, at sodales dui risus et ipsum. Nulla ipsum neque, bibe',
    3,11,now()::timestamp, now()::timestamp,15,8); -- 7
  CALL InsertSerie('Serie8',
    'Etiam eget placerat ante, id porttitor nunc',
    'Phasellus ligula leo, condimentum sed odio egestas, egestas interdum sem.',
    3,18,now()::timestamp, now()::timestamp,16,8); -- 8
  CALL InsertSerie('Serie9',
    'Ut maximus ultrices ornare.',
    'llentesque pretium orci, vitae sollicitudin purus luctus sit amet. Aliquam non risus commodo dui sollicitudin maximus ut vel enim. In lacinia h$$rerit eros, a pretium neque ultricies et. In id nibh a diam dictum tincidunt vel sed ante. Donec et molestie magna. Nulla ultrices dignissim augue vel suscipit.',
    3,12,now()::timestamp, now()::timestamp,18,9); -- 9
  CALL InsertSerie('Serie10',
    'Maecenas justo sem, vulputate nec ipsum at, pellentesque pharetra arcu. ',
    ' libero nec cursus. Etiam accumsan leo quis pretium pellentesque. Donec ultrices mi sed enim eleif$$ ullamcorper. Vivamus posuere purus quis lectus finibus, a ven',
    2,8,now()::timestamp, now()::timestamp,20,1); -- 10

-- INSERT LANGUAGE
  CALL InsertLanguage('Portuguese'); -- 1
  CALL InsertLanguage('English'); -- 2
  CALL InsertLanguage('Spanish'); -- 3
  CALL InsertLanguage('Polish'); -- 4
  CALL InsertLanguage('Arabic'); -- 5
  CALL InsertLanguage('Mandarin'); -- 6

-- INSERT MUSIC
  CALL InsertMusic('nameSong1','https://yt.be/nameSong1',1,1); -- 1
  CALL InsertMusic('nameSong2','https://yt.be/nameSong2',2,2); -- 2
  CALL InsertMusic('nameSong3','https://yt.be/nameSong3',3,2); -- 3
  CALL InsertMusic('nameSong4','https://yt.be/nameSong4',5,2); -- 4
  CALL InsertMusic('nameSong5','https://yt.be/nameSong5',4,3); -- 5
  CALL InsertMusic('nameSong6','https://yt.be/nameSong6',6,4); -- 6
  CALL InsertMusic('nameSong7','https://yt.be/nameSong7',1,5); -- 7
  CALL InsertMusic('nameSong8','https://yt.be/nameSong8',2,6); -- 8
  CALL InsertMusic('nameSong9','https://yt.be/nameSong9',1,7); -- 9
  CALL InsertMusic('nameSong10','https://yt.be/nameSong10',3,8); -- 10
  CALL InsertMusic('nameSong11','https://yt.be/nameSong11',4,9); -- 11
  CALL InsertMusic('nameSong12','https://yt.be/nameSong12',4,10); -- 12

-- INSERT STREAMING
  CALL InsertStreaming('netflix','https://netflix.com'); -- 1
  CALL InsertStreaming('hbomax','https://hbomax.com'); -- 2
  CALL InsertStreaming('amazon prime','https://primevideo.com'); -- 3
  CALL InsertStreaming('youtube','https://youtube.com'); -- 4
  CALL InsertStreaming('crunchyroll','https://crunchyroll.com'); -- 5
  CALL InsertStreaming('disney+','https://disneyplus.com'); -- 6
  CALL InsertStreaming('anime onegai','https://animeonegai.com'); -- 7

-- AUTHOR_SERIE
  CALL InsertAuthorSerie(1,1); -- 1
  CALL InsertAuthorSerie(2,2); -- 2
  CALL InsertAuthorSerie(3,3); -- 3
  CALL InsertAuthorSerie(4,4); -- 4
  CALL InsertAuthorSerie(5,5); -- 5
  CALL InsertAuthorSerie(6,6); -- 6
  CALL InsertAuthorSerie(7,7); -- 7
  CALL InsertAuthorSerie(8,8); -- 8
  CALL InsertAuthorSerie(9,9); -- 9
  CALL InsertAuthorSerie(8,10); -- 10
  CALL InsertAuthorSerie(1,6); -- 11
  CALL InsertAuthorSerie(5,10); -- 12

-- GALLERY
  CALL InsertGallery(1,1); --1
  CALL InsertGallery(2,1); --2
  CALL InsertGallery(3,1); --3
  CALL InsertGallery(4,2); --4
  CALL InsertGallery(5,2); --5
  CALL InsertGallery(6,3); --6
  CALL InsertGallery(7,4); --7
  CALL InsertGallery(8,5); --8
  CALL InsertGallery(9,5); --9
  CALL InsertGallery(10,5); --10
  CALL InsertGallery(11,5); --11
  CALL InsertGallery(12,6); --12
  CALL InsertGallery(13,6); --13
  CALL InsertGallery(14,7); --14
  CALL InsertGallery(15,7); --15
  CALL InsertGallery(16,8); --16
  CALL InsertGallery(17,8); --17
  CALL InsertGallery(18,9); --18
  CALL InsertGallery(19,10); --19
  CALL InsertGallery(20,10); --20

-- SERIE_STREAMING
  CALL InsertSerieStreaming(1,1); -- 1
  CALL InsertSerieStreaming(2,2); -- 2
  CALL InsertSerieStreaming(3,3); -- 3
  CALL InsertSerieStreaming(4,4); -- 4
  CALL InsertSerieStreaming(5,5); -- 5
  CALL InsertSerieStreaming(6,6); -- 6
  CALL InsertSerieStreaming(7,7); -- 7
  CALL InsertSerieStreaming(8,1); -- 8
  CALL InsertSerieStreaming(9,2); -- 9
  CALL InsertSerieStreaming(10,3); -- 10
  CALL InsertSerieStreaming(1,4); -- 11
  CALL InsertSerieStreaming(2,5); -- 12
  CALL InsertSerieStreaming(5,6); -- 13
  CALL InsertSerieStreaming(3,7); -- 14
  CALL InsertSerieStreaming(7,1); -- 15
  CALL InsertSerieStreaming(1,2); -- 16
  CALL InsertSerieStreaming(9,3); -- 17
  CALL InsertSerieStreaming(10,4); -- 18
  CALL InsertSerieStreaming(6,5); -- 19
  CALL InsertSerieStreaming(4,6); -- 20
  CALL InsertSerieStreaming(8,7); -- 21

-- STREAMING_LANGUAGE
  CALL InsertStreamingLanguage(1,1); -- 1
  CALL InsertStreamingLanguage(1,2); -- 2
  CALL InsertStreamingLanguage(1,3); -- 3
  CALL InsertStreamingLanguage(2,1); -- 4
  CALL InsertStreamingLanguage(2,2); -- 5
  CALL InsertStreamingLanguage(2,3); -- 6
  CALL InsertStreamingLanguage(3,1); -- 7
  CALL InsertStreamingLanguage(3,2); -- 8
  CALL InsertStreamingLanguage(3,2); -- 9
  CALL InsertStreamingLanguage(4,1); -- 10
  CALL InsertStreamingLanguage(4,2); -- 11
  CALL InsertStreamingLanguage(4,3); -- 12
  CALL InsertStreamingLanguage(4,4); -- 13
  CALL InsertStreamingLanguage(4,5); -- 14
  CALL InsertStreamingLanguage(4,6); -- 15
  CALL InsertStreamingLanguage(5,1); -- 16
  CALL InsertStreamingLanguage(5,2); -- 17
  CALL InsertStreamingLanguage(5,2); -- 18
  CALL InsertStreamingLanguage(6,2); -- 19
  CALL InsertStreamingLanguage(6,2); -- 20
  CALL InsertStreamingLanguage(7,3); -- 21

-- USER
  CALL InsertUser('manogarrafa','manogarrafa@mail.com'); -- 1
  CALL InsertUser('birgorna','birgorna@mail.com'); -- 2
  CALL InsertUser('ditongo','ditongo@mail.com'); -- 3
  CALL InsertUser('pauliada','pauliada@mail.com'); -- 4

-- QUERIES
  -- TODOS OS ESTUDIOS QUE POSSUEM UM OBRA EM PELO MENOS 3 STREAMINGS DIFERENTES, DEVE EXIBIR O NOME DA OBRA 
  SELECT stu."name" AS "Estúdio", se."name" AS "Seriado" FROM Studio stu
    JOIN Serie se ON stu.id = se.idStudio
    JOIN Serie_Streaming sestr ON se.id = sestr.idSerie
    GROUP BY stu.id, se.id HAVING COUNT(*) >=3  ORDER BY se."name" ;
  -- TODAS AS OBRAS QUE TEM MUSICA CANTADA EM PORTUGUES
  SELECT se."name" AS "Seriado" FROM serie se 
    JOIN music m ON se.id = m.idserie 
    AND m.idlanguage = 
    (SELECT id FROM "language" l WHERE l."language" = 'Portuguese');

  SELECT se."name" AS "Seriado" FROM serie se 
    JOIN music m ON se.id = m.idserie 
    JOIN "language" l ON l.id = m.idlanguage 
    AND l."language" = 'Portuguese';

  -- TODOS OS STREAMINGSS QUE POSSUEM UMA OBRA COM MAIS DE 1 AUTOR, DEVE RETORNAR O NOME DA OBRA
  SELECT s."name" AS "Streaming",s2."name" AS "Seriado" FROM streaming s 
    JOIN serie_streaming ss ON s.id =ss.idstreaming 
    JOIN serie s2 ON ss.idserie = s2.id 
    JOIN author_serie as2 ON s2.id = as2.idserie 
    GROUP BY s.id, s2.id HAVING COUNT(s2.id) >=2;