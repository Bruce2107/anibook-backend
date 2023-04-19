# Backend Anibook adaptado para a criação de um blog de séries

## **Instalação**

**Para instalar você vai precisar:**

- Node
- Postgres
- Docker (Opcional)

## **Bando de dados**

### _USANDO DOCKER_

Caso possa utilizar o docker este projeto possui um [docker-compose](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/config/qa/docker-compose.yml)

- Acessar a pasta `./config/qa`
- Executar o comando

```sh
docker-compose -d up
```

### _SEM DOCKER_

Caso queira criar usando o arquivo de _bump_ [`./config/qa/config/database/AnibookRelacional.sql`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/config/qa/config/database/AnibookRelacional.sql) **comentar 252 e 253**:

### _Variáveis para a criação do banco_

```
DB_HOST_POSTGRES=localhost
DB_USER_POSTGRES=anibook_qa
DB_PASS_POSTGRES=anibook_qa
DB_NAME_POSTGRES=anibook_qa
DB_PORT_POSTGRES=5433
PORT=4001
TOKEN=anibook_qa
```

Caso queira criar um banco com valores diferente alterar o arquivo [`./.env.qa`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/.env.qa)

## Executar o projeto

```sh
npm install
npm run dev
```

## Acessar o aplicativo

Com a aplicação executando abrir no navegador os arquivos

- [`./public/getOne.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/getOne.html)
- [`./public/getAll.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/getAll.html)
- [`./public/create.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/create.html)
- [`./public/update.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/update.html)
- [`./public/delete.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/delete.html)
- [`./public/reports.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/reports.html)

## Arquivos

Os arquivos relacionados a este trabalho estão nos seguintes diretórios

- [`./src/adapter/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/adapter/udesc)
- [`./src/domain/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/domain/udesc)
- [`./src/routes/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/routes/udesc)
- [`./src/usecase/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/usecase/udesc)

# License

[MIT](https://github.com/Bruce2107/anibook-backend/blob/development/LICENSE)
