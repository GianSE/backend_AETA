# 👤 API de Usuários (admin, coordenador, usuario)

Esta API permite o cadastro e autenticação de usuários. Abaixo está a documentação completa para utilizar todos os endpoints, incluindo exemplos de uso via Postman.

---

## 🚀 Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)

### Passos para rodar localmente:

```bash
# Clone o repositório
git clone https://github.com/GianSE/backend_AETA

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
   - `API_Usuarios_Com_Roles.postman_collection`
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
Qualquer pessoa pode se registrar. O papel (role) é opcional; se não for fornecido, será 'usuario' por padrão.

```json
{
  "name": "Novo Usuário",
  "email": "usuario@example.com",
  "password": "senha123",
  "phone": "11987654321",
  "role": "usuario"
}
```

**Resposta:** 201 Created

### 📍 `POST /usuario/login`

**Autenticar usuário e obter token**
Qualquer usuário registrado pode fazer login para obter um token de acesso.

```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:** 200 OK com token JWT

### 📍 `GET /usuario/all` (Requer Token - Admin/Coordenador)

**Listar todos os usuários**
Apenas usuários com papel de admin ou coordenador podem listar todos os usuários do sistema.


### 📍 `GET /usuario/:id` (Requer Token - Admin/Coordenador)

**Buscar usuário por ID**
Apenas usuários com papel de admin ou coordenador podem buscar um usuário específico pelo seu ID.

### 📍 `PATCH /usuario/:id` (Requer Token - Admin)

**Atualizar usuário**
Apenas usuários com papel de admin podem atualizar os dados de outros usuários, incluindo o seu papel (role).

```json
{
  "name": "Nome do Usuário Atualizado",
  "role": "coordenador"
}
```

### 📍 `DELETE /usuario/:id` (Requer Token - Admin)

**Deletar usuário por ID e os pets ligados ao mesmo**
Apenas usuários com papel de admin podem deletar outros usuários. A exclusão é permanente.

### 📍 `GET /usuario/me` *(com token)* (Requer Token)

**Resgata o usuário dono do token**
Qualquer usuário autenticado (admin, coordenador, usuario) pode acessar seus próprios dados.

---


## 📬 Exemplos de Uso no Postman

### ➕ Cadastro de Usuário

* Método: POST
* URL: `http://localhost:3000/usuario/register`
* Body: JSON com nome, email, senha, telefone, role

### 🔐 Login

* Método: POST
* URL: `http://localhost:3000/usuario/login`
* Body: JSON com email e senha
* Ação: O token JWT será salvo automaticamente na variável de ambiente {{auth_token}} do Postman.

### 📋 Listar Usuários (Admin/Coordenador)
* Método: GET
* URL: `http://localhost:3000/usuario/all`
* Autenticação: O token JWT ({{auth_token}}) é enviado automaticamente no cabeçalho Authorization.
---

## ✅ Considerações Finais

* Use ferramentas como Postman para testar. A coleção fornecida facilita o teste de diferentes papéis.

* Lembre-se de fazer login com um usuário admin para testar as rotas de atualização e exclusão.

* A segurança das rotas é garantida pelos middlewares checkToken e checkRole.
