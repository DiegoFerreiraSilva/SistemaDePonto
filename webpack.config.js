const path = require("path"); 

// Configuração do webpack para traduzir os códigos JS e CSS da pasta frontend para suas versões mais antigas criando o arquivo bundle.js
// Com isso o código poderá rodar normalmente em alguns navegadores mais antigos 
module.exports = {
  mode: "production",
  entry: "./frontend/main.js",
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }],
  },
  devtool: "source-map",
};
