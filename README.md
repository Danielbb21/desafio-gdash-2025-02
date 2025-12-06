# 🌤️ GDASH Climate Integration --- Prosel GDASH 2025/02

# Nome: Daniel Barbosa Bastos

Projeto desenvolvido para o processo seletivo **GDASH 2025/02**,
integrando múltiplas tecnologias em uma solução full-stack distribuída.\
O sistema coleta dados climáticos reais, processa-os via fila,
armazena-os em um backend NestJS, exibe um dashboard em React e gera
insights baseados em IA.

## 🚀 Tecnologias Utilizadas

### **Frontend**

- React + Vite\
- TailwindCSS\
- shadcn/ui

### **Backend (API)**

- NestJS (TypeScript)\
- MongoDB + Mongoose\
- JWT Authentication\
- Exportação CSV / XLSX\
- Geração de insights com IA (gemini-2.5-flash)

### **Coleta de Dados**

- Python\
- Requests / HTTPX\
- Envio periódico para a fila

### **Processamento**

- Go\
- Worker consumidor da fila\
- Validação e envio dos dados para a API

### **Infraestrutura**

- Docker & Docker Compose\
- RabbitMQ ou Redis\
- MongoDB em container

## 🧭 Arquitetura do Sistema

    (Python Collector) → coleta clima
             ↓ envia JSON
    [Message Broker: RabbitMQ]
             ↓
    (Go Worker) → processa & envia para API
             ↓
    (NestJS API) → persiste no MongoDB
             ↓
    (Frontend React) → dashboard + insights de IA

## 🌦️ Coleta de Dados (Python)

- Coleta periódica (de 1 em 1 hora) através da API Open-Meteo\
- Normalização dos dados\
- Envio em formato JSON para a fila (rabbitmq)

## 🐇 Worker em Go

- Consome mensagens através do rabbitmq\
- Retry básico + ack/nack\
- Logging
- Envio de dados pro backend via post request da api disponibilizada pelo Backend

## 🛠️ API Backend (NestJS)

### Weather

- Recebimento dos dados\
- Persistência no MongoDB\
- Endpoints para listagem, exportação(CSV e XLSX) e insights de IA(Gemini)

### Users

- CRUD\
- Autenticação JWT\
- Usuário padrão criado automaticamente

## 📊 Frontend (React + Vite)

- Dashboard\
- Tabelas e gráficos\
- Insights de IA\
- Exportação CSV/XLSX\
- Página de API pública (Pokémon) paginada

## 🐳 Como Rodar

```bash
git clone https://github.com/Danielbb21/desafio-gdash-2025-02.git
docker compose up --build
```

# Usuário padrão:

- E-mail: admin@example.com
- Senha: 123456

# urls:

- Frontend: http://localhost:5173/
- Backend: http://localhost:3000/
- MongoDB: mongodb://mongoadmin:mongoadmin@mongodb:27017/weather?authSource=admin

## 📂 Estrutura

    /frontend
    /backend
    /collector
    /worker
    /docker-compose.yml

## 📬 Contato

# E-mail: danielbarbosabastos21@gmail.com
