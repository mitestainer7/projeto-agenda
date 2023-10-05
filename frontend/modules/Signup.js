import validator from 'validator'
export default class Signup {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }
    init() {
        this.events();
    }
    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.valida(e)
        })
    }
    valida(e) {
        const erros = document.querySelectorAll('.erro');
        for (let p of erros) {
            p.remove();
        };

        const el = e.target;
        const emailInput = el.querySelector('input[class="email"]');
        const nomeInput = el.querySelector('input[class="nome"]');
        const sobrenomeInput = el.querySelector('input[class="sobrenome"]');
        const rpasswordInput = el.querySelector('input[class="rpassword"]');
        const passwordInput = el.querySelector('input[class="password"]');
        let error = false;
        if (!validator.isEmail(emailInput.value)) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            emailInput.after(p);
            error = true;
        }
        if (!nomeInput.value) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Nome precisa ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            nomeInput.after(p);
            error = true;
        }
        if (!sobrenomeInput.value) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Sobrenome precisa ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            sobrenomeInput.after(p);
            error = true;
        }
        if (passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('A senha precisa ter entre 6 e 20 caracteres')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            passwordInput.after(p);
            error = true;
        }
        if (rpasswordInput.value.length < 6 || rpasswordInput.value.length > 20) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Campo "Repetir Senha" precisa ter entre 6 e 20 caracteres')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            rpasswordInput.after(p);
            error = true;
        }
        if (passwordInput.value !== rpasswordInput.value){
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('As senhas devem ser iguais')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            passwordInput.after(p);
            error = true;
        }
        if (!error) el.submit();
    }
}