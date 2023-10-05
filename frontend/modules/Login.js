import validator from 'validator'
export default class Login {
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
        const passwordInput = el.querySelector('input[class="password"]');
        let error = false;
        if (!validator.isEmail(emailInput.value)) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            emailInput.after(p);
            error = true
        }
        if (passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('A senha precisa ter entre 6 e 20 caracteres')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            passwordInput.after(p);
            error = true
        }
        if (!error) el.submit();
    }
}