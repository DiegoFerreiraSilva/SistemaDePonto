const Ponto = require('../models/PontoModel');

exports.index = async (req, res) => {
    // Imprimindo os pontos batidos do funcionário na página principal
    if (req.session.user) {
        const pontos = await Ponto.searchPontos(req.session.user.email);
        res.render('index', { pontos });
        return;
    }
    res.render('index');
}
