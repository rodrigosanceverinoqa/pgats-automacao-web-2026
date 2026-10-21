/// <reference types="cypress" />

import {
    iniciarCadastro,
    preencherCadastro,
    fazerLogout,
    fazerLogin,
    validarUsuarioLogado,
    excluirConta
} from '../../modules/cadastro';

describe.only('Automation Exercises 2', () => {

    const nome = 'Fulano da Silva';
    const email = `pgats-aut-${Date.now()}@gmail.com`;
    const senha = '1234567';

    it.only('Cadastrar um novo usuário', () => {

        cy.visit('https://automationexercise.com/');

        iniciarCadastro(nome, email);

        preencherCadastro(senha);

        excluirConta()

    });

    it('Login do usuário com e-mail e senha corretos', () => {
        //const nome = 'Fulano da Silva';
        //const email = `pgats-aut-${Date.now()}@gmail.com`;
        //const senha = '1234567';

        cy.visit('https://automationexercise.com/');

        iniciarCadastro(nome, email);
        preencherCadastro(senha);
        validarUsuarioLogado(nome);

        fazerLogout();
        fazerLogin(email, senha);
        validarUsuarioLogado(nome);

        excluirConta();
    });

});