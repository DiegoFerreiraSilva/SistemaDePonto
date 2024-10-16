const Ponto = require("../models/PontoModel");

exports.index = (req, res) => {
  res.render("ponto");
};

// Batendo ponto no sistema
exports.baterPonto = async (req, res) => {
  try {
    const ponto = new Ponto(req.body);
    await ponto.baterPonto();

    // Exibindo mensagem de sucesso
    req.flash("success", "Ponto registrado com sucesso");
    req.session.save(() => res.redirect("/ponto/index"));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
