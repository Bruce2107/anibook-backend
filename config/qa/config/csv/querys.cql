CREATE (s:Serie {
  name: $name, 
  synopsis: $synopsis, 
  comment: $comment,
  numberOfEpisodes: $numberOfEpisodes,
  createdAt: datetime(),
  updatedAt: datetime()})
  WITH s
  MATCH (st:Studio {name: $studio})
  CREATE (s)-[:PRODUCED_BY]->(st)
  WITH s
  MATCH (sta:Status {value: $status})
  CREATE (s)-[:HAS_STATUS]->(sta)
  WITH s
  MATCH (c:Image {name: $cover})
  CREATE (s)-[:HAS_COVER]->(c)
  WITH s
  UNWIND $authors AS authors
  MATCH (a:Author {name: authors})
  CREATE (s)-[:HAS_AUTHOR]->(a)
  WITH s
  UNWIND $streaming as streamings
  MATCH (st:Streaming {name: streamings})
  CREATE (s)-[:AVAILABLE_ON]->(st)
  WITH s
  UNWIND $gallery as images
  MATCH (g:Image {name: images})
  CREATE (s)-[:HAS_GALLERY]->(g)
RETURN s;

MATCH (s: Streaming {name: $id})
  SET s.link = $link, s.name = $name
  WITH s
  UNWIND $languages as languages
  MATCH (l:Language {language: languages})
  WHERE NOT (s)-[:HAS_LANGUAGE]->(l)
    CREATE (s)-[rl:HAS_LANGUAGE]->(l)
RETURN s

MATCH (s:Serie {name: $id})
  SET s.name = $name, s.synopsis = $synopsis, s.comment = $comment, s.numberOfEpisodes = $numberOfEpisodes, s.updatedAt = datetime()
  WITH s
  MATCH (st:Studio {name: $studio})
  WHERE NOT (s)-[:PRODUCED_BY]->(st)
    CREATE (s)-[rs:PRODUCED_BY]->(st)
  WITH s
  MATCH (sta:Status {value: $status})
  WHERE NOT (s)-[:HAS_STATUS]->(sta)
    CREATE (s)-[rsta:HAS_STATUS]->(sta)
  WITH s
  MATCH (c:Image {name: $cover})
  WHERE NOT (s)-[:HAS_COVER]->(c)
    CREATE (s)-[rc:HAS_COVER]->(c)
  WITH s
  UNWIND $authors AS authors
  MATCH (a:Author {name: authors})
  WHERE NOT (s)-[:HAS_AUTHOR]->(a)
    CREATE (s)-[ra:HAS_AUTHOR]->(a)
  WITH s
  UNWIND $streaming as streamings
  MATCH (st:Streaming {name: streamings})
  WHERE NOT (s)-[:AVAILABLE_ON]->(st)
    CREATE (s)-[rst:AVAILABLE_ON]->(st)
  WITH s
  UNWIND $gallery as images
  MATCH (g:Image {name: images})
  WHERE NOT (s)-[:HAS_GALLERY]->(g)
    CREATE (s)-[rg:HAS_GALLERY]->(g)
RETURN s

MATCH (s:Serie {name: 'SerieTeste2'})-[r:PRODUCED_BY]-(:Studio),
  (s)-[rsta:HAS_STATUS]-(:Status),
  (s)-[rc:HAS_COVER]-(:Image),
  (newSt:Studio {name: 'Filmology Finance'}),
  (newSta:Status {value: 'ON GOING'}),
  (newC:Image {name: 'capa10'})
  SET s.name = 'SerieGarrafa', s.synopsis = 'idem', s.comment = 'idem', s.numberOfEpisodes = 2107, s.updatedAt = datetime()
  CREATE (s)-[:PRODUCED_BY]->(newSt),
  (s)-[:HAS_STATUS]->(newSta),
  (s)-[:HAS_COVER]->(newC)
  DELETE r, rsta, rc
  WITH s
  UNWIND ['George Cukor'] AS authors
  MATCH (a:Author {name: authors})
  WHERE NOT (s)-[:HAS_AUTHOR]->(a)
    CREATE (s)-[ra:HAS_AUTHOR]->(a)
  WITH s
  UNWIND ['hbomax','disney+'] as streamings
  MATCH (st:Streaming {name: streamings})
  WHERE NOT (s)-[:AVAILABLE_ON]->(st)
    CREATE (s)-[rst:AVAILABLE_ON]->(st)
  WITH s
  UNWIND ['capa8'] as images
  MATCH (g:Image {name: images})
  WHERE NOT (s)-[:HAS_GALLERY]->(g)
    CREATE (s)-[rg:HAS_GALLERY]->(g)
RETURN s


MATCH (s:Serie)
  OPTIONAL MATCH (s)-[:HAS_MUSIC]->(m:Music),
  (s)-[:HAS_STATUS]->(st:Status),
  (s)-[:PRODUCED_BY]->(std:Studio),
  (s)-[:HAS_AUTHOR]->(a:Author),
  (s)-[:AVAILABLE_ON]->(str:Streaming) 
WITH s, collect(m) as m, st,std,collect(a) as a, collect(str) as str
RETURN s,m,st,std,a,str ORDER BY s.name
