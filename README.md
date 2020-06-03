# Anibook Backend

## Backend para a aplicação [Anibook](https://github.com/Bruce2107/anibook-frontend)

### **Instalação**

**Para instalar você vai precisar:**

- Yarn
- Postgres > 9.5
- Mongo

Para desenvolvimento:

```sh
$ yarn
$ yarn start:dev
```

Para produção:

```sh
$ yarn
$ yarn build
$ yarn start
```

### **Testes**

```sh
$ yarn test
```

### **Databases**

- Postgres

```sql
CREATE TABLE IF NOT EXISTS animes (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);
CREATE TABLE IF NOT EXISTS mangas (ID serial NOT NULL PRIMARY KEY, dados json NOT NULL);

```

- Mongo

```sh
use anibook
db.createCollection("images")
db.createCollection("users")
```

### **Notas**

* No projeto já existe um arquivo docker-compose, ele não cria as collection do mongo, mas copia todo o projeto para o container.

* No arquivo [Anibook.postman_collection.json](https://github.com/Bruce2107/anibook-backend/blob/development/Anibook.postman_collection.json) existem todas as rotas e como podem ser usadas, além de possuir em sua descrição um exemplo completo dos dados para o Postgres


#### _Dúvidas_

Para qualquer dúvida entre em contato via [Twitter](https://twitter.com/Bruce2107).
