
<div align="center">

# 💜 Toque de Esperança

### Plataforma Web de Solidariedade e Campanhas Sociais

**Conectando pessoas, doadores e instituições por meio da tecnologia e da solidariedade.**

<br>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

<br>

[Sobre](#-sobre-o-projeto) •
[Funcionalidades](#-funcionalidades) •
[Tecnologias](#-tecnologias-utilizadas) •
[Instalação](#-instalação-e-execução) •
[Estrutura](#-estrutura-do-projeto)

</div>

---

## 📖 Sobre o projeto

O **Toque de Esperança** é uma plataforma web desenvolvida para facilitar a conexão entre pessoas que desejam contribuir com causas sociais e aquelas que precisam de ajuda.

A aplicação permite criar, divulgar e encontrar campanhas solidárias, promovendo a colaboração entre doadores, organizações e comunidades em situação de vulnerabilidade.

O projeto busca demonstrar como a tecnologia pode contribuir para iniciativas de impacto social, oferecendo um ambiente digital para divulgação de necessidades, comunicação entre participantes e acompanhamento de campanhas.

### 🎯 Objetivos

- Aproximar pessoas que desejam ajudar de quem precisa de apoio.
- Facilitar a divulgação de campanhas solidárias.
- Incentivar a participação em iniciativas sociais.
- Centralizar informações de campanhas e doações.
- Promover a comunicação entre os participantes.
- Aplicar conceitos de desenvolvimento web full stack.

---

## ✨ Funcionalidades

### 👤 Gerenciamento de usuários

- Cadastro de novos usuários.
- Login com autenticação.
- Armazenamento de senhas utilizando hash.
- Utilização de tokens JWT.
- Acesso a páginas privadas.
- Painel individual para gerenciamento de atividades.

### 💜 Campanhas solidárias

O sistema permite criar e divulgar campanhas de duas modalidades:

- **Pedido de ajuda:** campanhas destinadas a pessoas ou instituições que necessitam de recursos.
- **Oferta de doação:** campanhas criadas por usuários que desejam oferecer ajuda.

As campanhas podem conter:

- Título e descrição.
- Localização.
- Categoria da campanha.
- Imagem de apresentação.
- Meta de arrecadação ou quantidade.
- Datas de início e término.
- Informações de contato.
- Links complementares.

### 📋 Gerenciamento de campanhas

- Criação de campanhas com upload de imagens.
- Visualização das campanhas cadastradas.
- Consulta de informações detalhadas.
- Edição de campanhas existentes.
- Exclusão de campanhas.
- Marcação de campanhas como concluídas.
- Organização das campanhas por modalidade.

### 🔎 Busca e filtros

A plataforma disponibiliza uma área de pesquisa para localizar campanhas.

Os filtros permitem pesquisar por:

- Palavras presentes no título, descrição ou localização.
- Modalidade de participação.
- Categoria da campanha.

### 💬 Comunicação entre usuários

- Publicação e visualização de comentários nas campanhas.
- Troca de mensagens entre usuários.
- Conversas associadas a campanhas específicas.
- Consulta do histórico de mensagens.
- Organização das conversas no painel do usuário.

> O chat utiliza requisições HTTP para enviar e consultar mensagens. A implementação atual não utiliza WebSockets para atualização em tempo real.

---

## 🛠️ Tecnologias utilizadas

### Front-end

| Tecnologia | Finalidade |
|:---|:---|
| **React 19** | Construção das interfaces |
| **JavaScript** | Lógica e interatividade |
| **Vite** | Ambiente de desenvolvimento e build |
| **React Router** | Navegação entre páginas |
| **CSS3** | Estilização e organização visual |
| **React Icons** | Ícones da interface |

### Back-end

| Tecnologia | Finalidade |
|:---|:---|
| **Node.js** | Ambiente de execução JavaScript |
| **Express 5** | Servidor e rotas da API |
| **MongoDB** | Banco de dados NoSQL |
| **Mongoose** | Modelagem e persistência dos dados |
| **JWT** | Geração e verificação de tokens |
| **bcryptjs** | Hash de senhas |
| **Multer** | Upload de imagens |
| **CORS** | Configuração de acesso à API |
| **dotenv** | Carregamento de variáveis de ambiente |

---

## 🏗️ Arquitetura da aplicação

O projeto utiliza uma arquitetura cliente-servidor, separando a interface web da API e da persistência de dados.

```text
                  ┌──────────────────────┐
                  │       USUÁRIO        │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │       FRONT-END      │
                  │    React + Vite      │
                  └──────────┬───────────┘
                             │
                      Requisições HTTP
                             │
                             ▼
                  ┌──────────────────────┐
                  │       BACK-END       │
                  │   Node.js + Express  │
                  └──────────┬───────────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
               ▼                           ▼
    ┌────────────────────┐      ┌────────────────────┐
    │       MongoDB      │      │      Uploads       │
    │ Usuários, campanhas│      │ Imagens das        │
    │ e mensagens        │      │ campanhas          │
    └────────────────────┘      └────────────────────┘
```

A comunicação entre o front-end e o back-end é realizada por meio de requisições HTTP, com troca de informações em formato JSON e envio de formulários multipart para imagens.

---

## 📁 Estrutura do projeto

```text
toque-de-esperanca/
│
├── back-end/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── domain/
│   │   ├── campanhas/
│   │   │   ├── model.js
│   │   │   └── routes.js
│   │   │
│   │   ├── comentarios/
│   │   │   ├── model.js
│   │   │   └── routes.js
│   │   │
│   │   ├── mensagens/
│   │   │   ├── model.js
│   │   │   └── routes.js
│   │   │
│   │   └── users/
│   │       ├── model.js
│   │       └── routes.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── front-end/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Item.jsx
│   │   │   └── RotaPrivada.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Registro.jsx
│   │   │   ├── BuscarCampanha.jsx
│   │   │   ├── CriarCampanha.jsx
│   │   │   ├── DetalhesCampanha.jsx
│   │   │   ├── PainelUsuario.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Sobre.jsx
│   │   │   └── AcessoNegado.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.txt
└── README.md
```

### Organização dos componentes

| Diretório | Responsabilidade |
|:---|:---|
| `config/` | Configuração da conexão com o banco de dados |
| `domain/users/` | Cadastro e autenticação de usuários |
| `domain/campanhas/` | Gerenciamento das campanhas |
| `domain/comentarios/` | Comentários associados às campanhas |
| `domain/mensagens/` | Comunicação entre usuários |
| `middleware/` | Verificação de autenticação |
| `components/` | Componentes reutilizáveis da interface |
| `pages/` | Páginas da aplicação |

---

## 🚀 Instalação e execução

### Pré-requisitos

Para executar o projeto localmente, é necessário possuir:

- **Node.js** e npm instalados.
- **MongoDB** local ou MongoDB Atlas.
- **Git** para clonar o repositório.

Recomenda-se utilizar uma versão LTS atual do Node.js compatível com o Vite 6.

### 1. Clone o repositório

```bash
git clone https://github.com/JuliaGabrielyPereiraRodrigues/toque-de-esperanca.git
```

Acesse o diretório:

```bash
cd toque-de-esperanca
```

### 2. Configure o back-end

Entre na pasta:

```bash
cd back-end
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo chamado `.env` dentro da pasta `back-end`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/toque_de_esperanca
JWT_SECRET=substitua_por_uma_chave_secreta_segura
```

Caso utilize MongoDB Atlas, substitua a variável `MONGO_URL` pela string de conexão correspondente ao seu banco de dados.

> Nunca publique credenciais reais ou chaves secretas no GitHub.

### 3. Inicie o servidor

```bash
npm run dev
```

O back-end utiliza a porta definida no arquivo `.env`.

Com a configuração acima, a API estará disponível em:

```text
http://localhost:3000
```

### 4. Configure o front-end

Abra outro terminal e, a partir da raiz do repositório, acesse:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

```text
http://localhost:5173
```

> **Importante:** o front-end utiliza `http://localhost:3000` para acessar a API. Mantenha o back-end e o MongoDB em execução para utilizar as funcionalidades dependentes de dados.

### 5. Acesse a aplicação

Abra o navegador e acesse:

**http://localhost:5173**

Você poderá navegar pelas campanhas públicas ou criar uma conta para acessar as funcionalidades que exigem autenticação.

**Observação:** estas instruções seguem a configuração identificada no código. A execução integrada não foi validada neste ambiente.

---

## 🔗 Principais rotas da API

A aplicação utiliza endpoints HTTP organizados por domínio.

### Campanhas

| Método | Rota | Descrição |
|:---|:---|:---|
| `GET` | `/campanhas` | Lista campanhas |
| `GET` | `/campanhas/:id` | Consulta uma campanha |
| `POST` | `/campanhas` | Cria uma campanha |
| `PUT` | `/campanhas/:id` | Atualiza uma campanha |
| `PATCH` | `/campanhas/:id/concluir` | Marca uma campanha como concluída |
| `DELETE` | `/campanhas/:id` | Exclui uma campanha |

### Comentários

| Método | Rota | Descrição |
|:---|:---|:---|
| `GET` | `/comentarios/:campanhaId` | Lista comentários de uma campanha |
| `POST` | `/comentarios` | Adiciona um comentário |

### Mensagens

| Método | Rota | Descrição |
|:---|:---|:---|
| `POST` | `/chat` | Envia uma mensagem |
| `GET` | `/chat/conversa` | Consulta mensagens de uma conversa |
| `GET` | `/chat/por-criador/:email` | Consulta conversas de um usuário |

> As rotas documentam os endpoints presentes no código. As operações que modificam dados precisam de uma revisão de autorização antes de disponibilizar a API publicamente.

---

## 🔐 Autenticação e segurança

O projeto utiliza mecanismos de autenticação e proteção de credenciais.

### Recursos implementados

- Hash de senhas com `bcryptjs`.
- Geração de tokens JWT.
- Middleware para verificação de tokens.
- Controle de navegação para páginas privadas no React.
- Armazenamento local de informações de sessão.

O projeto foi desenvolvido para fins de aprendizagem e ainda necessita de melhorias de segurança para utilização em produção.

---

## 🌱 Impacto social

O Toque de Esperança tem como proposta utilizar a tecnologia para incentivar a solidariedade e contribuir com iniciativas relacionadas aos **Objetivos de Desenvolvimento Sustentável (ODS)**.

### Objetivos relacionados

- **ODS 1 — Erradicação da Pobreza:** apoiar iniciativas direcionadas a populações vulneráveis.
- **ODS 2 — Fome Zero e Agricultura Sustentável:** incentivar campanhas de doação de alimentos.
- **ODS 12 — Consumo e Produção Responsáveis:** estimular o reaproveitamento e a redistribuição de recursos.

O impacto apresentado representa a proposta do projeto, não resultados sociais já comprovados.

---

## 📚 Aprendizados

O desenvolvimento da plataforma envolve conhecimentos em:

- Desenvolvimento web full stack.
- Construção de interfaces com React.
- Componentização e gerenciamento de estados.
- Navegação com React Router.
- Desenvolvimento de APIs REST com Express.
- Integração entre front-end e back-end.
- Modelagem de dados com MongoDB e Mongoose.
- Autenticação com JWT.
- Upload e armazenamento de arquivos.
- Manipulação de formulários.
- Organização de código por responsabilidades.
- Desenvolvimento colaborativo de software.

---

## 🔮 Possíveis melhorias

Entre as oportunidades de evolução da aplicação estão:

- Aplicar autorização no back-end para operações privadas.
- Implementar testes automatizados.
- Adicionar atualização de mensagens em tempo real.
- Aprimorar as validações de formulários e uploads.
- Centralizar a configuração das URLs da API.
- Implementar notificações para novas mensagens.
- Melhorar a acessibilidade e a responsividade.
- Criar uma página de indicadores de campanhas.
- Disponibilizar um ambiente de demonstração.
- Ampliar a documentação das rotas da API.

---

## 🎓 Contexto do projeto

O Toque de Esperança foi desenvolvido em equipe como projeto voltado à aplicação de conhecimentos em desenvolvimento web e à criação de uma solução tecnológica com propósito social.

### 👥 Equipe

- Maria Eduarda Marques Silva
- Júlia Gabriely Pereira Rodrigues
- Igor Teles Lima
- Luis Fernando Monteiro de Assis Lourenço
- Lucas Ferreira Coelho
- Isabelle Louzada de Araújo

---

<div align="center">

### 💜 Tecnologia que conecta pessoas

**Desenvolvido com o propósito de transformar solidariedade em ação.**

<br>

**[Julia Gabriely](https://github.com/JuliaGabrielyPereiraRodrigues)**

---

**[⬆ Voltar ao topo](#-toque-de-esperança)**

</div>
