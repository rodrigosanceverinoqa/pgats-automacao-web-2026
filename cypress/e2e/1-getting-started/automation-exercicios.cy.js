/// <reference types="cypress" />

describe('Automation Exercises', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        //cy.get() -> elementos baseados em css seletor
        //cy.contains() -> elementos baseados em texto

        cy.visit('https://automationexercise.com/');

        cy.get('a[href*=login]').click();

        //const randomEmail = `pgats-aut-+${Date.now()}@gmail.com`;

        cy.get('[data-qa="signup-name"]').type('Teste rsg');

        cy.get('[data-qa="signup-email"]').type(`pgats-aut-+${Date.now()}@gmail.com`);

        cy.get('[data-qa="signup-button"]').click();

        //radio button e checkboxes
        cy.get('#id_gender2').check();

        cy.get('[data-qa="password"]').type('12345');

        // selects e combobox -> select 
        cy.get('[data-qa="days"]').select('1');

        //adicionar mes e ano
        cy.get('[data-qa="months"]').select('1');
        cy.get('[data-qa="years"]').select('2000');

        //checkboxes -> check
        cy.get('#newsletter').check();
        cy.get('#optin').check();

        /**
         * demais campos de texto, similar ao nome e mail
         */

        cy.get('[data-qa="first_name"]').type('rsgpgats');

        cy.get('[data-qa="last_name"]').type('pgatsrsg');

        cy.get('[data-qa="company"]').type('julio de lima ltda');

        cy.get('[data-qa="address"]').type('Rua dos testes, 0');

        cy.get('[data-qa="country"]').select('United States');

        cy.get('[data-qa="state"]').type('California');

        cy.get('[data-qa="city"]').type('Los Angeles');

        cy.get('[data-qa="zipcode"]').type('90001');

        cy.get('[data-qa="mobile_number"]').type('+1 1234567890');

        cy.get('[data-qa="create-account"]').click();

        //expect -> validações
        cy.get('[data-qa="account-created"]').should('contain.text', 'Account Created!');
    });
});