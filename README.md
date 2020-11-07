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

| Método | Url            | Descrição                                                           |
| ------ | -------------- | ------------------------------------------------------------------- |
| POST   | '/auth/signup' | Cria um usuário no banco de dados e retorna um token de autorização |
| POST   | '/auth/login'  | Checa as credenciais providas e retorna um token caso tenha sucesso |
| GET    | '/auth/me'     | Retorna o usuário caso o token recebido no header seja válido       |

### Requests

`'/auth/signup'` recebe um objeto contendo name, email, password e passwordConfirm no body

```json
{
  "name": "usuario",
  "email": "usuario@email.com",
  "password": "senha123",
  "passwordConfirm": "senha123"
}
```

`'/auth/login'` recebe um objeto contendo email e password no body

```json
{
  "email": "usuario@email",
  "password": "senha123"
}
```

`'/auth/me'` recebe um header `Authorization` contendo a string `"Bearer "` seguido do token criptografado recebido do login ou signup

```json
"Authorization": "Bearer [seu-token]"
```

## Senhas hasheadas

As senhas salvas nessa aplicação são hasheadas e filtradas durante a criação do token para garantir a segurança dos dados do usuário
