const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const SignupSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  telefone: { type: String },
  password: { type: String, required: true }
},
  { collection: 'users' }
);
const SignupModel = mongoose.model('Signup', SignupSchema);

class Signup {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async signin() {
    this.validaSignin();
    if(this.errors.length > 0) return;
    this.user = await SignupModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuário não cadastrado. Cadastre-se já!');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida.');
      this.user = null;
      return;
    }
  }

  async register() {
    this.validaSignup();
    if (this.errors.length > 0) return;

    delete this.body.rpassword;

    await this.userExists()

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt)

    this.user = await SignupModel.create(this.body);
  }

  async userExists() {
    this.user = await SignupModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuário já existente.');
  }

  validaSignup() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!');

    if(!this.body.nome) this.errors.push('Nome precisa ser preenchido!');

    if(!this.body.sobrenome) this.errors.push('Sobrenome precisa ser preenchido!');

    if(this.body.password.length < 6 || this.body.password.length > 20) this.errors.push('A senha precisa ter entre 6 e 20 caracteres!');
    

    if(this.body.rpassword.length < 6 || this.rpassword.length > 20) this.errors.push(`Campo "Repetir Senha" precisa ter entre 6 e 20 caracteres`);
    

    if(this.body.password !== this.body.rpassword) this.errors.push('As senhas precisam ser iguais!');
  }

  validaSignin() {
    this.cleanUp();
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
  }

  cleanUp() {
    for(let key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      email: this.body.email,
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      password: this.body.password,
      rpassword: this.body.rpassword
    }
  }
}

module.exports = Signup;
