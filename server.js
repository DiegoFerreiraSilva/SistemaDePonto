// Configuração do arquivo .env que possui as senhas do desenvolvimento
require('dotenv').config();

// Inicialização do Express
const express = require("express");
const app = express();

// Modelação da base de dados com moongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
  app.emit('ready');
}).catch(e => console.log(e));

// Bibliotecas utilizadas na aplicação
// - Session utilizado para salvar o cookie(id) da sessão do usuário
const session = require('express-session');
// - MongoStore utilizado para salvar a sessão do usuário na base de dados
const mongoStore = require('connect-mongo');
// - FlashMessages para mensagens rápidas
const flash = require('connect-flash');
// - Path para trabalhar com os caminhos da aplicação
const path = require("path");
// - Helmet sendo uma recomendação do próprio express para deixar a aplicação mais segura
const helmet = require('helmet');
// - Crsf tokens para impedir que sites externos injetem dados maliciosos na nossa aplicação, também nessário para segurança
const csrf = require('csurf');

// Configuração das rotas e dos middlewares
// - Rotas das aplicação (/Home, /Contato, etc...)
const routes = require("./routes");
// - Middlewares da aplicação
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Inicialização e configuração do Helmet
app.use(helmet());
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));

// Permitindo o envio de formulários na aplicação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Permitindo o acesso de arquivos estáticos do projeto como JS e CSS
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurações das sessões do projeto
const sessionOptions = session({
  secret: 'gHGDgh1378@3(',
  // A ConnectionString passada nesta linha é gerada pelo MongoDB utilizando o plano gratuito
  store: mongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

// Configurando as Views do projeto com a engine do EJS
app.set("views", path.resolve(__dirname, 'src', 'views'));
app.set("view engine", "ejs");

// Inicialização do csrf Token para validação de formulários
app.use(csrf());

// Inicialização dos Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Inicialização das rotas
app.use(routes);

// Com a conclusão da modelação da base de dados a inicialização do sistema irá ocorrer na porta 3000 
app.on('ready', () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
  });
});


