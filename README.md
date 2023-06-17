# Backend Anibook adaptado para a criação de um blog de séries

## **Instalação**

**Para instalar você vai precisar:**

- Node
- Neo4J
- Docker (Opcional)

## **Bando de dados**

### _USANDO DOCKER_

Caso possa utilizar o docker este projeto possui um [docker-compose](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/config/qa/docker-compose.yml)

- Acessar a pasta `./config/qa`
- Executar o comando

```sh
docker-compose -d up
```

- Acesso o terminal docker da imagem do Neo4J e execute o comando para importar os dados

```sh
  cypher-shell --file $NEO4J_HOME/import/data.cypher -u neo4j -p anibook_qa
```

### _SEM DOCKER_

Caso queira criar usando o arquivo de _bump_ [`./config/qa/config/csv/data.cypher`](https://github.com/Bruce2107/anibook-backend/blob/udesc_neo4j/config/qa/config/csv/data.cypher) importe a pasta deste arquivo para o diretório `/var/lib/neo4j/import` da sua instalação Neo4J e execute o comando

```sh
  cypher-shell --file $NEO4J_HOME/import/data.cypher -u neo4j -p anibook_qa
```

### _Variáveis para a criação do banco_

```
DB_PORT_NEO4J=7687
DB_USER_NEO4J=neo4j
DB_PASS_NEO4J=anibook_qa
PORT=4001
```

Caso queira criar um banco com valores diferente alterar o arquivo [`./.env.qa`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/.env.qa)

## Executar o projeto

```sh
npm install
npm run dev
```

## Acessar o aplicativo

Com a aplicação executando abrir no navegador o arquivo

- [`./public/graph/index.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_neo4j/public/graph/index.html)

## Arquivos

Os arquivos relacionados a este trabalho estão nos seguintes diretórios

- [`./src/adapter/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_neo4j/src/adapter/udesc)
- [`./src/domain/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_neo4j/src/domain/udesc)
- [`./src/routes/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_neo4j/src/routes/udesc)
- [`./src/usecase/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_neo4j/src/usecase/udesc)

# License

[MIT](https://github.com/Bruce2107/anibook-backend/blob/development/LICENSE)
