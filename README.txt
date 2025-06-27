 TOQUE DE ESPERANÇA - INSTRUÇÕES DE EXECUÇÃO

Este projeto é dividido em duas partes principais:

-  BACK-END (Node.js + Express + MongoDB)
-  FRONT-END (React)

Requisitos obrigatórios para rodar:

✔ Node.js instalado (versão 16+ recomendada)
✔ NPM instalado
✔ MongoDB Atlas ou local configurado
✔ Conexão com a internet para baixar dependências

 CONFIGURAÇÃO DO BACK-END

1. Acesse a pasta do back-end:

   cd back-end

2. Instale todas as dependências:

   npm install

3. Crie um arquivo chamado `.env` na raiz da pasta `back-end`, ao lado do arquivo `index.js`.

   O conteúdo do arquivo `.env` deve conter as seguintes informações:

PORT=3000
MONGO_URL=mongodb+srv://juhgabriely21:dDuZh71uzWoSoNka@cluster0.df9qsi1.mongodb.net/toqueesperanca?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=4Ul35OUb45Klmf

4. Inicie o servidor:

npm run dev

O back-end estará disponível em:

http://localhost:3000


 CONFIGURAÇÃO DO FRONT-END

1. Abra um novo terminal e vá para a pasta do front-end:

cd front-end

2. Instale todas as dependências:

npm install

3. Inicie o servidor de desenvolvimento:

npm run dev

O front-end estará acessível via:

http://localhost:5173

 IMPORTANTE

- O front-end se comunica com o back-end através do endereço: `http://localhost:3000`
- Certifique-se de que o back-end esteja rodando antes de usar o front-end.
- As imagens são salvas na pasta `uploads/` no back-end.
- O campo de login utiliza localStorage para manter a sessão.

 ESTRUTURA PRINCIPAL

/back-end
├── index.js
├── .env         
├── domain/
├── uploads/
└── ...

/front-end
├── src/
├── public/
└── ...

 DÚVIDAS COMUNS

- "npm: comando não encontrado": Certifique-se de que o Node.js está instalado corretamente.
- "Erro 401 mesmo logado": Verifique se o token e o localStorage estão funcionando e se o back-end aceita o cabeçalho Authorization.
- "Erro ao conectar no MongoDB": Verifique se a URI do `.env` está correta e o IP está liberado no MongoDB Atlas.

-------------------------------------
         USUÁRIOS PARA TESTE
-------------------------------------

Você pode utilizar os usuários abaixo para testar as funcionalidades do sistema:

1. Usuário 
- Email: maria.teste@gmail.com
- Senha: 123456

2. Usuário 
- Email: joao.dev@gmail.com
- Senha: 123456

⚠️ Observação: se estes usuários não estiverem cadastrados no banco, crie manualmente via registro no front-end ou insira diretamente no MongoDB.


