FROM neo4j:latest

ENV NEO4J_HOME="/var/lib/neo4j" \
    NEO4J_PASSWD=anibook_qa
    
CMD cypher-shell --file $NEO4J_HOME/import/data.cypher -u neo4j -p $NEO4J_PASSWD
