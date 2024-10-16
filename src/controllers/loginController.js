const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
    
        // Retornando mensagem de erro caso tenha ocorrido algum
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('/login/index');
            })
            return
        }

        // Retornando mensagem de sucesso
        req.flash('success', 'Usuário cadastrado com sucesso!');
        req.session.save(function(){
            return res.redirect('/login/index');
        });
    } catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Login efetuado com sucesso');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('/login/index');
        });
    }catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
    return;
}
