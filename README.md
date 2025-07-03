# 🐾 API de Usuários e Pets

Esta API permite o cadastro e autenticação de usuários, gerenciamento de pets e o processo de adoção. Abaixo está a documentação completa para utilizar todos os endpoints, incluindo exemplos de uso via Postman.

---

## 🚀 Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)

### Passos para rodar localmente:

```bash
# Clone o repositório
git clone https://github.com/GianSE/capacitacao-parte2

# Instale as dependências
npm install
```

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Substitua com sua string de conexão do MongoDB Atlas
MONGO_URL=mongodb+srv://seu_usuario:sua_senha@seuclusterteste.mongodb.net/nomeDoBanco?retryWrites=true&w=majority

# Chave secreta usada para assinar tokens JWT, pode ser qualquer coisa ex: batata123
SECRET=minha_chave_secreta_ultra_segura
```

```bash
# Inicie a aplicação
npm start
```

---

## 📂 Coleções do Postman

O projeto inclui uma pasta chamada `postman/` com coleções e um ambiente configurado para facilitar os testes da API.

### Como usar:

1. Abra o Postman.
2. Clique em **"Import"** e selecione a pasta `postman/` ou seus arquivos:
   - `API Usuario.postman_collection.json`
   - `API Pets.postman_collection.json`
   - `Localhost API.postman_environment.json`
3. Selecione o ambiente **Localhost API** no canto superior direito do Postman.
4. Agora você pode testar todos os endpoints com exemplos prontos e variáveis como token e ID já configuradas.

> ✅ As coleções incluem todos os endpoints com exemplos de requisições, corpo e autenticação via JWT.

### ℹ️ Dica: uso automático de token e ID de usuário no Postman

Após o login com sucesso via `POST /usuario/login`, o ambiente `Localhost API` armazena automaticamente:

- `auth_token` – token JWT
- `user_id` – ID do usuário logado

Essas variáveis são usadas em todas as outras requisições, em que exigem elas, automaticamente.

> Não é necessário copiar e colar manualmente o token ou ID para testar as rotas protegidas!

---

## 🔐 Autenticação

A autenticação é feita via JWT. Após o login, você receberá um token que deve ser usado para rotas protegidas.

Porém ao logar a variável do ambiente {{auth_token}} será atualizada e poderá autenticar as rotas protegidas automaticamente

```
Authorization: Bearer SEU_TOKEN_JWT
```

---

## 👤 Usuário

### 📍 `POST /usuario/register`

**Cadastrar novo usuário**

```json
{
  "name": "Gian",
  "email": "gian@gmail.com",
  "password": "123456",
  "phone": "11999999999"
}
```

**Resposta:** 201 Created

### 📍 `POST /usuario/login`

**Autenticar usuário e obter token**

```json
{
  "email": "gian@gmail.com",
  "password": "123456"
}
```

**Resposta:** 200 OK com token JWT

### 📍 `GET /usuario/all`

**Listar todos os usuários**

### 📍 `GET /usuario/:id`

**Buscar usuário por ID**

### 📍 `PATCH /usuario/:id`

**Atualizar usuário**

```json
{
  "name": "Maria Silva"
}
```

### 📍 `DELETE /usuario/:id`

**Deletar usuário por ID e os pets ligados ao mesmo**

### 📍 `GET /usuario/me` *(com token)*

**Resgata o usuário dono do token**

---

## 🐶 Pets

### 📍 `POST /pet/register` *(com token)*

**Cadastrar pet**

```json
{
  "name": "Thor",
  "age": 3,
  "weight": 10,
  "color": "Marrom"
}
```

### 📍 `GET /pet/all`

**Listar todos os pets disponíveis**

### 📍 `GET /pet/mypets` *(com token)*

**Listar pets do usuário logado**

### 📍 `GET /pet/:id`

**Buscar pet por ID**

### 📍 `PATCH /pet/:id` *(com token)*

**Atualizar pet**

```json
{
  "weight": 12
}
```

### 📍 `DELETE /pet/:id` *(com token)*

**Remover pet**

### 📍 `PATCH /pet/schedule/:id` *(com token)*

**Agendar visita para adoção**

### 📍 `PATCH /pet/adopt/:id` *(com token)*

**Concluir adoção do pet**

---

## 📬 Exemplos de Uso no Postman

### ➕ Cadastro de Usuário

* Método: POST
* URL: `http://localhost:3000/usuario/register`
* Body: JSON com nome, email, senha e telefone

### 🔐 Login

* Método: POST
* URL: `http://localhost:3000/usuario/login`
* Body: JSON com email e senha
* **Copie o token da resposta para usar nas próximas requisições.**

### 🐶 Cadastro de Pet (com Token)

* Método: POST
* URL: `http://localhost:3000/pet/register`
* Headers: Authorization: Bearer `TOKEN`
* Body: JSON com dados do pet

### 📆 Agendar Visita

* Método: PATCH
* URL: `http://localhost:3000/pet/schedule/{id}`
* Headers: Authorization: Bearer `TOKEN`

### 🏡 Concluir Adoção

* Método: PATCH
* URL: `http://localhost:3000/pet/adopt/{id}`
* Headers: Authorization: Bearer `TOKEN`

---

## ✅ Considerações Finais

* Use ferramentas como Postman para testar.
* Sempre forneça o token JWT nas rotas protegidas.
