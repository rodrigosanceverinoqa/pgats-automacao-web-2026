/// <reference types="cypress" />

export const cadastroPage = {
    get titulo() {
        return cy.get('.signup-form > h2');
    },
    get tituloInformacoes() {
        return cy.contains('b', 'Enter Account Information', { timeout: 15000 });
    },
    get mensagemDeErro() {
        return cy.get('.signup-form > form > p');
    },
    get mensagemContaCriada() {
        return cy.get('[data-qa="account-created"]', { timeout: 15000 });
    },
    iniciarCadastro(nome, email) {
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        return cy.get('[data-qa="signup-button"]').click();
    },
    preencherCadastro(dados) {
        cy.get('input[name="title"]').check(dados.titulo);
        cy.get('[data-qa="days"]').select(dados.dia);
        cy.get('[data-qa="months"]').select(dados.mes);
        cy.get('[data-qa="years"]').select(dados.ano);
        if (dados.newsletter) {
            cy.get('#newsletter').check();
        }
        if (dados.ofertas) {
            cy.get('#optin').check();
        }
        cy.get('[data-qa="password"]').type(dados.senha);
        cy.get('[data-qa="first_name"]').type(dados.nome);
        cy.get('[data-qa="last_name"]').type(dados.sobrenome);
        cy.get('[data-qa="company"]').type(dados.empresa);
        cy.get('[data-qa="address"]').type(dados.endereco);
        cy.get('[data-qa="country"]').select(dados.pais);
        cy.get('[data-qa="state"]').type(dados.estado);
        cy.get('[data-qa="city"]').type(dados.cidade);
        cy.get('[data-qa="zipcode"]').type(dados.cep);
        cy.get('[data-qa="mobile_number"]').type(dados.telefone);
    },
    criarConta() {
        cy.intercept('POST', '**/signup').as('criarConta');
        cy.get('[data-qa="create-account"]').click();
        return cy.wait('@criarConta', { responseTimeout: 60000 });
    },
    continuar() {
        return cy.get('[data-qa="continue-button"]').click();
    }
};
