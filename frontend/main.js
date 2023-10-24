import './assets/css/style.css'

import 'core-js/stable';
import 'regenerator-runtime/runtime';


import Login from './modules/Login'
const login = new Login('.signin')
login.init();

import Signup from './modules/Signup'
const signup = new Signup('.signup')
signup.init();

import Contato from './modules/Contato'
const contato = new Contato('.contato')
contato.init();

import changeTheme from './modules/DarkTheme';
changeTheme();

import mascaraInput from './modules/Mascara';
mascaraInput();

import initMenuMobile from './modules/MenuMobile';
initMenuMobile();