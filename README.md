## O que você precisa

- Node.js 22.15.0

## Instalar dependências

```bash
npm install
# ou
yarn install
```

## Inicialização

Para executar o servidor da API (Porta 3001):

```bash
node ./api.js
```

Acesse [http://localhost:3001](http://localhost:3001) como URL base para as rotas da API.

## Arquitetura

- REST

## Usuário admin

```bash
{
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
}
```

## Documentação

```bash
POST /login
```
```bash
{
    "username": "admin@spsgroup.com.br",
    "password": "1234"
}
```
> Gera o token JWT.

```bash
GET /users
```
> Lista todos usuários cadastrados.

```bash
GET /users/:email
```
> Lista um usuário pelo e-mail.

```bash
POST /users
```
```bash
{
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
}
```
> Cria um novo usuário.

```bash
PATCH /users/:email
```
```bash
{
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
}
```
> Edita as informações de um usuário buscando pelo e-mail.

```bash
DELETE /users/:email
```
```bash
{
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
}
```
> Deleta um usuário buscando pelo e-mail.
