const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    // Verificando e realizando o Login no sistema caso o email e senha informados existam
    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('Usuário ou senha incorretos');
            return;
        };

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Usuário ou senha incorretos');
            this.user = null;
            return;
        }
    }

    async register() {
        // Validando os dados passados
        this.valida();
        if(this.errors.length > 0) return;

        // Validando se o email Já possui uma conta
        await this.userExists();
        if(this.errors.length > 0) return;

        // Realizando o Hash da senha informada
        const sault = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, sault);

        // Salvando os dados no banco de dados
        this.user = await LoginModel.create(this.body);
    }

    async userExists(){
        // Consultando se o email informado já está dentro do banco de dados
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user) this.errors.push('O email informado já possui uma conta');
    }

    valida() {
        this.cleanUp();
        // Validando o email
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        // Validando a senha
        if(this.body.password.length < 6 || this.body.password.length > 50) this.errors.push('A senha deve ter entre 6 a 50 caracteres.');
    }

    cleanUp() {
        // Filtrando e validando os dados informados pelo cliente
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            };
        };

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;