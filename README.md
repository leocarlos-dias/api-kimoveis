# KImóveis

### Sobre

KImóveis é uma API desenvolvida para uma imobiliária gerenciar seus imóveis, usuários e agendamentos. Este projeto foi desenvolvido durante o módulo de backend na Kenzie Academy Brasil.


### Tecnologias Utilizadas
Abaixo estão listadas as principais tecnologias utilizadas neste projeto:

- **Node.js** com **TypeScript** como linguagem de programação e ambiente de execução;
- **TypeORM** como ORM (Object-Relational Mapping) para conexão e manipulação do banco de dados;
- **Postgres** como banco de dados relacional em ambiente de produção;
- **SQLite** como banco de dados relacional em ambiente de desenvolvimento e testes;
- **JWT** (JSON Web Tokens) para autenticação e autorização de rotas;
- **Jest** como framework de testes automatizados;
- **zod** para validação de dados nas rotas da API.


### Instalação

Para instalar as dependências necessárias, execute o seguinte comando:

```bash
npm install
# ou
yarn
```


### Configuração

Para configurar a aplicação, crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:

```bash
PORT=application_run_port_must_be_an_integer
SECRET_KEY=jwt_secret_key
EXPIRES_IN=jwt_expires_in
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
NODE_ENV=development || test
```


### Execução

Para iniciar a aplicação, execute o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

Acesse a documentação em **http://localhost:3333/api-docs**.


### Testes

Para executar os testes da aplicação, execute o seguinte comando:

```bash
npm run test
# ou
yarn test
```


### Documentação

A documentação da API pode ser acessada em http://localhost:3333/api-docs quando a aplicação estiver em execução. Lá você encontrará informações sobre as rotas disponíveis, bem como exemplos de requisições e respostas. Não deixe de conferir!
