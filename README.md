# Anibook Backend

## Backend para a aplicação [Anibook](https://github.com/Bruce2107/anibook-frontend)

### **Instalação**

**Para instalar você vai precisar:**

- Yarn
- Postgres > 9.5

Para desenvolvimento:

```sh
yarn
yarn start:dev
```

Para produção:

```sh
yarn
yarn build
yarn start
```

### **Testes**

```sh
yarn test
```

### **Databases**

- Postgres

```sql
CREATE TABLE IF NOT EXISTS animes (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);

CREATE TABLE IF NOT EXISTS mangas (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);

CREATE TABLE IF NOT EXISTS images (ID serial NOT NULL PRIMARY KEY, name text NOT NULL, folder text NOT NULL, "contentType" text NOT NULL, image bytea NOT NULL);

CREATE TABLE IF NOT EXISTS users (ID serial NOT NULL PRIMARY KEY, email text NOT NULL, nickname text NOT NULL);

```

### **Environment**

```env
DB_HOST_POSTGRES=
DB_USER_POSTGRES=
DB_PASS_POSTGRES=
DB_NAME_POSTGRES=
DB_PORT_POSTGRES=
TOKEN=
```

### **_Link público_**

- [anibook-backend](https://anibook-backend.herokuapp.com/)

### **Notas**

- No projeto já existe um arquivo docker-compose.

- No arquivo [Anibook.postman_collection.json](https://github.com/Bruce2107/anibook-backend/blob/development/Anibook.postman_collection.json) existem todas as rotas e como podem ser usadas, além de possuir em sua descrição um exemplo completo dos dados do tipo `anime` e `manga`

#### _Dúvidas_

Para qualquer dúvida entre em contato via [Twitter](https://twitter.com/Bruce2107).

## License

[MIT](https://github.com/Bruce2107/anibook-backend/blob/development/LICENSE)
