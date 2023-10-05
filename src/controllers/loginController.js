const Signup = require('../models/SignupModel')

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logado')
  return res.render('login')
}

exports.signup = async function (req, res) {
  try {
    const signupDatas = new Signup(req.body)
    await signupDatas.register()

    if(signupDatas.errors.length > 0) {
      req.flash('errors', signupDatas.errors)
      req.session.save(function() {
        return res.redirect('../login/index')
      })
      return
    }

    req.flash('success', 'Seu usuário foi criado com sucesso!')
    req.session.save(function() {
      return res.redirect('../login/index');
    })
  } catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.signin = async function (req, res) {
  try {
    const signinDatas = new Signup(req.body)
    await signinDatas.signin()

    if(signinDatas.errors.length > 0) {
      req.flash('errors', signinDatas.errors)
      req.session.save(function() {
        return res.redirect('/login/index')
      })
      return
    }
    
    req.flash('success', 'Você fez login com sucesso!')
    req.session.user = signinDatas.user
    req.session.save(function() {
      return res.redirect('/')
    })
  } catch(e) {
    console.log(e)
    return res.render('../views/404')
  }
}

exports.logout = function(req, res) {
  req.session.destroy()
  res.redirect('/login/index')
}