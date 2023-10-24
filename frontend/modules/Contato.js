import validator from 'validator'
export default class Contato {
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
        const nomeInput = el.querySelector('input[class="nome"]');
        const telefoneInput = el.querySelector('input[class="telefone"]');
        const emailInput = el.querySelector('input[class="email"]');
        let error = false;
        if (!nomeInput.value) {
            let form = document.querySelector('.contato')
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Nome precisa ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            form.before(p);
            error = true;
        }
        if(!emailInput.value && !telefoneInput.value){
            let form = document.querySelector('.contato')
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email ou telefone deve ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            form.before(p);
            error = true;
            return;
        }
        if (!telefoneInput.value && !validator.isEmail(emailInput.value)) {
            let form = document.querySelector('.contato')
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            form.before(p);
            error = true;
        }

        if (!error) el.submit();
    }
}