LOAD CSV WITH HEADERS FROM 'file:///language.csv' AS language
MERGE (l: Language {languageId: language.id, language: language.language});

LOAD CSV WITH HEADERS FROM 'file:///author.csv' AS author
MERGE (at: Author {authorId: author.id, name: author.name});

LOAD CSV WITH HEADERS FROM 'file:///streaming.csv' AS streaming
MERGE (st: Streaming {streamingId: streaming.id, name: streaming.name, link: streaming.link});

LOAD CSV WITH HEADERS FROM 'file:///status.csv' AS status
MERGE (s: Status {statusId: status.id, value: status.value});

LOAD CSV WITH HEADERS FROM 'file:///studio.csv' AS studio
MERGE (std: Studio {studioId: studio.id, name: studio.name});

LOAD CSV WITH HEADERS FROM 'file:///image.csv' AS image
MERGE (img: Image {imageId: image.id, name: image.name, contentType: image.contentType, link: image.link, folder: image.folder});

LOAD CSV WITH HEADERS FROM 'file:///music.csv' AS music
MERGE (m: Music {musicId: music.id, name: music.name, link: music.link, idserie: music.idserie, idlanguage: music.idlanguage});

LOAD CSV WITH HEADERS FROM 'file:///serie.csv' AS serie
MERGE (sr: Serie {serieId: serie.id, name: serie.name, synopsis: serie.synopsis, comment: serie.comment, numberOfEpisodes: serie.numberofepisodes, status: serie.status, cover: serie.cover, idstudio: serie.idstudio});

MATCH (sr: Serie), (std: Studio)
WHERE sr.idstudio = std.studioId
CREATE (sr)-[:PRODUCED_BY]->(std);

MATCH (sr: Serie), (s: Status)
WHERE sr.status = s.statusId
CREATE (sr)-[:HAS_STATUS]->(s);

MATCH (sr: Serie), (m: Music)
WHERE sr.serieId = m.idserie
CREATE (sr)-[:HAS_MUSIC]->(m);

MATCH (m: Music), (l: Language)
WHERE m.idlanguage = l.languageId
CREATE (m)-[:HAS_LANGUAGE]->(l);

MATCH (sr: Serie), (img: Image)
WHERE sr.cover = img.imageId
CREATE (sr)-[:HAS_COVER]->(img);

LOAD CSV WITH HEADERS FROM 'file:///serieauthor.csv' AS serieauthor
MATCH (sr: Serie), (at: Author)
WHERE sr.serieId = serieauthor.idserie AND at.authorId = serieauthor.idauthor
CREATE (sr)-[:HAS_AUTHOR]->(at);

LOAD CSV WITH HEADERS FROM 'file:///gallery.csv' AS gallery
MATCH (sr: Serie), (img: Image)
WHERE sr.serieId = gallery.idserie AND img.imageId = gallery.idimage
CREATE (sr)-[:HAS_GALLERY]->(img);

LOAD CSV WITH HEADERS FROM 'file:///seriestreaming.csv' AS seriestreaming
MATCH (sr: Serie), (st: Streaming)
WHERE sr.serieId = seriestreaming.idserie AND st.streamingId = seriestreaming.idstreaming
CREATE (sr)-[:AVAILABLE_ON]->(st);

LOAD CSV WITH HEADERS FROM 'file:///streaminglanguage.csv' AS streaminglanguage
MATCH (st: Streaming), (l: Language)
WHERE st.streamingId = streaminglanguage.idstreaming AND l.languageId = streaminglanguage.idlanguage
CREATE (st)-[:HAS_LANGUAGE]->(l);

MATCH (at: Author)
REMOVE at.authorId;

MATCH (img: Image)
REMOVE img.imageId;

MATCH (l: Language)
REMOVE l.languageId;

MATCH (m: Music)
REMOVE m.musicId, m.idlanguage, m.idserie;

MATCH (s: Status)
REMOVE s.statusId;

MATCH (sr: Serie)
REMOVE sr.serieId, sr.idstudio, sr.status, sr.cover;

MATCH (st: Streaming)
REMOVE st.streamingId;

MATCH (std: Studio)
REMOVE std.studioId;