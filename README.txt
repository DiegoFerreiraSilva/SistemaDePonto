Sistema de Ponto Eletrônico:
Este é um sistema de ponto eletrônico desenvolvido utilizando as tecnologias Express.js no backend, Mongoose para modelar os dados no MongoDB, e Webpack para o empacotamento dos arquivos JavaScript e CSS do frontend.

Inicizalição do Sistema
- No terminal basta digitar "npm start" e acessar o link informado
- Necessário adicionar uma ConnectionString gratuita com o mongoDB no arquivo server.js linha 49 para o funcionamento do sistema

Funcionalidades:
- Cadastro de funcionários
- Registro de entradas e saídas de funcionários
- Visualização do histórico de pontos registrados
- Autenticação de usuários
- Interface com templates EJS para interação com o sistema
- Gerenciamento de dados com MongoDB
- Empacotamento dos arquivos frontend com Webpack

Tecnologias Utilizadas:
- Express.js: Framework minimalista para criação do servidor e rotas.
- Mongoose: ODM (Object Data Modeling) para modelar e manipular dados do MongoDB.
- MongoDB: Banco de dados NoSQL utilizado para armazenar os dados do sistema de ponto.
- Webpack: Utilizado para empacotamento e otimização dos arquivos estáticos (JavaScript, CSS, etc.).
- EJS: Template engine para gerar o HTML dinâmico no frontend.

Requisitos:
- Node.js (v12 ou superior)
- MongoDB (local ou em uma instância na nuvem)
- NPM ou Yarn para gerenciamento de pacotes


Funcionalidades em Desenvolvimento:
- Separação de conta Funcionário e Supervisor
- Tornar criações de conta disponível apenas a uma conta Admin
- Separar pontos batidos por mês e ano a fim de evitar uma poluição visual na página principal
- Adicionar Cálculo de horas adicionais ou devidas
- Tornar as páginas responsivas

 Funcionalidades Funcionário:
 - Possibilidade de solicitações de remoção e correção de pontos registrados
 - Horário dos pontos a serem batidos separado por turno

 Funcionalidades Supervisor:
 - Página para verificação de funcionários e seus pontos registrados
 - Página para aceitar e/ou negar solicitações de correção de pontos
