<div align="center">

# 💜 Toque de Esperança

**Plataforma web para conectar pessoas por meio de campanhas solidárias.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

[Sobre](#-sobre-o-projeto) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Execução](#-como-executar) • [Estrutura](#-estrutura-do-projeto)

</div>

---

## 📖 Sobre o projeto

O **Toque de Esperança** é um projeto de desenvolvimento web full stack voltado à criação e à divulgação de campanhas solidárias. A proposta é aproximar pessoas que precisam de apoio de quem deseja oferecer ajuda, por meio de uma plataforma com campanhas, comentários e troca de mensagens.

O sistema foi desenvolvido em equipe, utilizando **React** no front-end, **Node.js e Express** no back-end e **MongoDB** na persistência dos dados.

## ✨ Funcionalidades

- **Usuários:** cadastro, login e páginas com controle de acesso na interface.
- **Campanhas:** criação, consulta, edição, exclusão e conclusão de campanhas.
- **Modalidades:** campanhas para pedir ajuda e oferecer doações.
- **Busca:** pesquisa e filtros para encontrar campanhas.
- **Interações:** comentários em campanhas e troca de mensagens entre usuários.
- **Imagens:** envio de imagens associadas a campanhas.

> **Nota:** o projeto é acadêmico. O controle de acesso visual não substitui a autorização das operações no servidor; recomenda-se revisar a segurança antes de uma publicação pública.

## 🛠️ Tecnologias

| Camada | Tecnologias |
| :--- | :--- |
| Front-end | React 19, JavaScript, Vite, React Router, CSS e React Icons |
| Back-end | Node.js, Express 5 e API HTTP |
| Banco de dados | MongoDB e Mongoose |
| Autenticação | JSON Web Token (JWT) e bcryptjs |
| Outros recursos | Multer, CORS e dotenv |

## 📁 Estrutura do projeto

```text
toque-de-esperanca/
├── back-end/
│   ├── config/               # Conexão com banco de dados
│   ├── domain/
│   │   ├── users/            # Usuários e autenticação
│   │   ├── campanhas/        # Campanhas solidárias
│   │   ├── comentarios/      # Comentários
│   │   └── mensagens/        # Conversas
│   ├── middleware/           # Autenticação
│   ├── index.js              # Inicialização da API
│   └── package.json
├── front-end/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🚀 Como executar

### Pré-requisitos

- Node.js e npm
- MongoDB local ou MongoDB Atlas
- Git (opcional)

### 1. Clonar o repositório

```bash
git clone https://github.com/JuliaGabrielyPereiraRodrigues/toque-de-esperanca.git
cd toque-de-esperanca
```

### 2. Configurar e iniciar o back-end

```bash
cd back-end
npm install
```

Crie um arquivo `.env` dentro de `back-end/`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/toque_de_esperanca
JWT_SECRET=substitua_por_uma_chave_secreta_forte
```

Inicie o servidor:

```bash
npm run dev
```

### 3. Iniciar o front-end

Em outro terminal, a partir da raiz do projeto:

```bash
cd front-end
npm install
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente **http://localhost:5173**. O front-end espera a API em **http://localhost:3000**.

> Os comandos seguem a configuração encontrada no código. O funcionamento integrado depende do MongoDB e das variáveis de ambiente; não foi validado como implantação de produção.

## 🧩 Organização da aplicação

A interface React realiza requisições HTTP à API Express, que organiza as operações por domínio: usuários, campanhas, comentários e mensagens. Os dados são armazenados no MongoDB por meio do Mongoose.

O chat utiliza requisições HTTP para envio e consulta de mensagens; não há implementação de WebSocket nesta versão.

## 📚 Aprendizados

- Desenvolvimento front-end com React e componentes reutilizáveis.
- Construção e consumo de APIs com Express.
- Modelagem de dados com MongoDB e Mongoose.
- Integração entre interface, servidor e banco de dados.
- Autenticação com tokens e hash de senhas.
- Desenvolvimento colaborativo e organização por funcionalidades.

## 🔮 Melhorias futuras

- Reforçar autorização nas rotas de alteração de dados.
- Validar tipos e limites dos arquivos enviados.
- Automatizar testes de interface e API.
- Implementar atualizações de chat em tempo real.
- Adicionar demonstração online e capturas de tela.

## 👥 Equipe

- Maria Eduarda Marques Silva
- Júlia Gabriely Pereira Rodrigues
- Igor Teles Lima
- Luis Fernando Monteiro de Assis Lourenço
- Lucas Ferreira Coelho
- Isabelle Louzada de Araújo

---

<div align="center">

**Projeto acadêmico desenvolvido em equipe.**

[GitHub de Julia Gabriely](https://github.com/JuliaGabrielyPereiraRodrigues)

</div>
