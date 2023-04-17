# Anibook Backend Adaptado

## Backend Anibook adaptado para a criação de um blog de séries

### **Instalação**

**Para instalar você vai precisar:**

- Node
- Postgres

### **Bando de dados**

Criar um banco de dados usando o arquivo [`./config/qa/config/database/AnibookRelacional.sql`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/config/qa/config/database/AnibookRelacional.sql) e usando as seguintes variáveis:

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

### Executar o projeto

```sh
npm install
npm run dev
```

### Acessar o aplicativo

Com a aplicação executando abrir no navegador os arquivos

- [`./public/getOne.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/getOne.html)
- [`./public/getAll.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/getAll.html)
- [`./public/create.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/create.html)
- [`./public/update.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/update.html)
- [`./public/delete.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/delete.html)
- [`./public/reports.html`](https://github.com/Bruce2107/anibook-backend/blob/udesc_bd_relacional/public/reports.html)

### Arquivos relacionados

Os arquivos relacionados a este trabalho estão nos seguintes diretórios

- [`./src/adapter/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/adapter/udesc)
- [`./src/domain/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/domain/udesc)
- [`./src/routes/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/routes/udesc)
- [`./src/usecase/udesc`](https://github.com/Bruce2107/anibook-backend/tree/udesc_bd_relacional/src/usecase/udesc)

# License

[MIT](https://github.com/Bruce2107/anibook-backend/blob/development/LICENSE)
