# 🧁 Cupcake Shop – Projeto Integrador em Engenharia de Software II

![Status](https://img.shields.io/badge/status-MVP%20Concluído-brightgreen)
![Documentation](https://img.shields.io/badge/documentation-v1.0-blue)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-cyan)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

Este repositório contém o projeto **Cupcake Shop**, desenvolvido como parte da disciplina de **Projeto Integrador Transdisciplinar em Engenharia de Software II**.  
O objetivo é construir um MVP funcional de venda de cupcakes, incluindo autenticação básica, catálogo, carrinho e cadastro de produtos para administradores.

---

## 🚀 Deploy

- **Frontend (Vercel):** https://cupcake-shop-omega.vercel.app/
- **Backend API (Render):** https://cupcake-shop.onrender.com

---

## 📌 Sobre o Projeto

O **Cupcake Shop** é uma aplicação web que simula uma pequena loja de cupcakes.  
Ela foi planejada para ser simples, funcional e didática, atendendo às exigências essenciais do Projeto Integrador:

- Autenticação mínima (Admin + Customer)
- Catálogo de cupcakes
- Carrinho de compras
- Finalização de pedido

O foco principal é demonstrar domínio de:

- Modelagem de banco de dados
- Desenvolvimento backend com Node.js/Express
- Integração com frontend React
- Princípios básicos de UX
- Organização em camadas seguindo o padrão MVC

---

## ⭐ Funcionalidades

### 👤 Autenticação

- Login de **customer**
- Login de **admin**
- Controle de acesso baseado em papel

### 🛍️ Cliente

- Visualizar catálogo de cupcakes
- Adicionar itens ao carrinho
- Alterar quantidades
- Finalizar pedido
- Registro do pedido no banco de dados

### 🧁 Administrador

- Login exclusivo
- Listagem dos produtos cadastrados

---

## 🛠 Tecnologias Utilizadas

### **Frontend**

- React + Vite
- TypeScript
- Tailwind
- Deploy: Vercel

### **Backend**

- Node.js
- Express
- JWT (autenticação)
- bcrypt (optional hashing)
- MVC simples
- Deploy: Render

### **Banco de Dados**

- MySQL ou MariaDB

---

## 🗃️ Estrutura do Banco de Dados (Resumo)

### `users`

| Campo    | Tipo                     | Descrição     |
| -------- | ------------------------ | ------------- |
| id       | INT PK                   | Identificador |
| name     | VARCHAR                  | Nome          |
| email    | VARCHAR UNIQUE           | Login         |
| password | VARCHAR                  | Senha         |
| role     | ENUM('admin','customer') | Papel         |

### `products`

| Campo       | Tipo    |
| ----------- | ------- |
| id          | INT PK  |
| name        | VARCHAR |
| description | TEXT    |
| price       | DECIMAL |
| image_url   | VARCHAR |
| stock       | INT     |
| is_active   | BOOLEAN |

### `orders`

| Campo      | Tipo      |
| ---------- | --------- |
| id         | INT PK    |
| user_id    | FK        |
| total      | DECIMAL   |
| status     | VARCHAR   |
| created_at | TIMESTAMP |

### `order_items`

Itens associados ao pedido.

---

## 🌐 Endpoints Principais

### 🔐 Auth

- `POST /auth/login`
- `POST /auth/register` (customer opcional)

### 🧁 Products

- `GET /products`
- `POST /products` (admin only)

### 🛒 Orders

- `POST /orders` (customer)

---

## 🧪 Testes

Como este é um MVP focado na integração, foram realizados:

- Testes manuais do fluxo principal
- Validação de comportamento nos ambientes deployados (frontend + backend)
- Correção de erros reportados durante os testes (quando aplicável)

---

## 📌 Status do Projeto

- ✔ Modelagem concluída
- ✔ Backend implementado
- ✔ Frontend funcional
- ✔ Integração concluída

---

## 👨‍💻 Autor

**Nome:** Lucas Felix
**Curso:** Engenharia de Software  
**Projeto Integrador Transdisciplinar II**
