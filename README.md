# Refund 2.0 🚀

API de solicitação de reembolso desenvolvida com Node.js, Express e TypeScript.

## 📋 Descrição

O Refund 2.0 é uma API RESTful para gerenciamento de solicitações de reembolso empresarial. Permite que funcionários e gerentes criem, visualizem e gerenciem solicitações de reembolso com diferentes categorias e upload de comprovantes.

## ✨ Funcionalidades

- **Autenticação JWT** - Sistema seguro de login e registro
- **Gestão de Usuários** - Criação e autenticação de usuários
- **Solicitações de Reembolso** - CRUD completo para reembolsos
- **Upload de Arquivos** - Sistema para upload de comprovantes
- **Controle de Acesso** - Diferentes níveis de usuário (employee/manager)
- **Categorização** - Organização por categorias (food, transport, accommodation, services, others)
- **Banco de Dados SQLite** - Persistência de dados com Prisma ORM

## 🛠️ Tecnologias

- **Backend**: Node.js + Express
- **Linguagem**: TypeScript
- **Banco de Dados**: SQLite
- **ORM**: Prisma
- **Autenticação**: JWT + bcrypt
- **Upload**: Multer
- **Validação**: Zod
- **CORS**: Suporte para requisições cross-origin

## 📁 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração principal da aplicação
├── server.ts             # Servidor HTTP
├── routes/               # Definição das rotas
├── controllers/          # Lógica de negócio
├── middlewares/          # Middlewares (auth, error handling)
├── database/             # Configuração do banco
├── configs/              # Configurações (auth, upload)
├── providers/            # Provedores de serviços
├── types/                # Definições de tipos TypeScript
└── utils/                # Utilitários e classes de erro
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd refund2.0
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
npx prisma migrate dev
```

4. Execute o projeto:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Rotas da API

### Rotas Públicas
- `POST /users` - Criar usuário
- `POST /sessions` - Fazer login

### Rotas Privadas (requer autenticação)
- `GET /refunds` - Listar reembolsos
- `POST /refunds` - Criar reembolso
- `PUT /refunds/:id` - Atualizar reembolso
- `DELETE /refunds/:id` - Deletar reembolso
- `POST /uploads` - Upload de arquivo

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas privadas, inclua o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

## 📊 Modelos de Dados

### User
- `id`: UUID único
- `name`: Nome do usuário
- `email`: Email único
- `password`: Senha criptografada
- `role`: Função (employee/manager)

### Refunds
- `id`: UUID único
- `name`: Nome da solicitação
- `amount`: Valor do reembolso
- `category`: Categoria (food, transport, accommodation, services, others)
- `filename`: Nome do arquivo de comprovante
- `userId`: ID do usuário solicitante

## 🎯 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento com hot-reload
- `npx prisma studio` - Abre interface visual do banco de dados
- `npx prisma migrate dev` - Executa migrações do banco
- `npx prisma generate` - Gera cliente Prisma

## 🔧 Configuração

O projeto utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-aqui"
```

## 📝 Exemplo de Uso

### Criar usuário
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@empresa.com", "password": "123456"}'
```

### Fazer login
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@empresa.com", "password": "123456"}'
```

### Criar reembolso (com token)
```bash
curl -X POST http://localhost:3333/refunds \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Almoço", "amount": 25.50, "category": "food"}'
```

## 👨‍💻 Autor

**Kevin Solar** - Desenvolvedor Full Stack

## 📄 Licença

Este projeto está sob a licença ISC.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
