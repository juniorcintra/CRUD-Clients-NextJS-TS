Esse é um projeto desenvolvido em NextJS, utilizando Docker para subir o banco de dados e prisma para gerenciamento de banco de dados.

## Rodando o projeto

Para rodar o projeto, execute os comandos na mesma ordem:

```bash
npm install

docker compose up -d

npx prisma generate

npx prisma migrate deploy

npm run dev
```

Isso já suficiente para rodar o projeto. Feito isso, basta acessar http://localhost:3000 e a aplicação já deve estar rodando.

Lembrando: É necessário fazer login com o google (funcionalidade extra) para realizar cadastro e edição de clientes.
