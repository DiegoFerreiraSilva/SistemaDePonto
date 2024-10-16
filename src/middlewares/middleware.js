// Variáveis Globais da Aplicação
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.userId = req.session.user.email;
    next();
}

// Verificando se ocorreu algum erro na validação do formulário
exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404');
    }
    next();
}

// Token de validação de formulários
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

// Validando se o usuário já está logado
exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa estar logado para acessar está página');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }
    next();
}
