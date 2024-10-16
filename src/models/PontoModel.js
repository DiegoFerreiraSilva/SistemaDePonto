const mongoose = require('mongoose');
const PontoSchema = new mongoose.Schema({
    email: {type: String, required: true},
    date: {type: String, required: true},
    pontos: {type: Array, required: true}
})

const PontoModel = mongoose.model('Ponto', PontoSchema);

class Ponto{
    constructor(body){
        this.body = body;
        this.user = null;
    }

    
    async baterPonto(){
        this.filterData();
    
        // Verificando se o email logado já bateu o ponto de entrada do dia
        this.user = await this.searchUser(this.body.email, this.body.date);
        if(this.user !== null){
            // Se sim atualizamos o campo pontos
            this.user = await PontoModel.findOneAndUpdate({email: this.body.email, date: this.body.date}, {pontos: [...this.user.pontos, ...this.body.pontos] });
        } else {
            // Se não criamos um novo documento JSON no MongoDB
            this.user = await PontoModel.create(this.body);
        }
    }

    // Filtrando dados do formulário
    filterData() {
        this.date = new Date();
        this.body = {
            email: this.body.email,
            date: `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`,
            pontos: [this.body.pontos]
        };
    }

    // Localização do usuário via email e data
    async searchUser(email, date) {
        const user = await PontoModel.findOne({ email, date });
        return user;
    }

    // Métodos Estáticos
    // Localização de todos os pontos batido pelo email logado
    static async searchPontos(userEmail){
        if (userEmail) {
            const pontos = await PontoModel.find({ email: userEmail }).sort({date: 1});
            return pontos;
        }
        return;
    }
}

module.exports = Ponto;
