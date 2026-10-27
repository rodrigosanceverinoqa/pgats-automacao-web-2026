/// <reference types="cypress" />

export const loginPage = {
    acessarPeloMenu() {
        return cy.get('a[href="/login"]').click();
    },

    get titulo() {
        return cy.get('.login-form > h2');
    },

    get mensagemDeErro() {
        return cy.get('.login-form > form > p');
    },

    preencherEmail(email) {
        return cy.get('[data-qa="login-email"]').type(email);
    },

    preencherSenha(senha) {
        return cy.get('[data-qa="login-password"]').type(senha);
    },

    entrar() {
        return cy.get('[data-qa="login-button"]').click();
    },

    sair() {
        return cy.get('a[href="/logout"]').click();
    }
};
