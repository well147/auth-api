# auth-api
Api simples de autenticação e autorização feita utilizando express e jwt em Typescript

## Como rodar a aplicação
Primeiro instale as dependências do projeto
```shell
yarn

// ou

npm install
```
Depois rode o script dev

```shell
yarn dev

// ou

npm run dev
```

## Endpoints

Método | Url            | Descrição
------ | -------------- | ----------
POST   | '/auth/signup' | Cria um usuário no banco de dados e retorna um token de autorização
POST   | '/auth/login'  | Checa as credenciais providas e retorna um token caso tenha sucesso
GET    | '/auth/me'     | Retorna o usuário caso o token recebido no header seja vãlido

## Senhas hasheadas
As senhas salvas nessa aplicação são hasheadas e filtradas durante a crianção do token para garantir a segurança dos dados do usuário
