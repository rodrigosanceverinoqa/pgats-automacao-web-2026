/// <reference types="cypress" />


describe('Automation Exercises 2', () => {
    it('Cadastrar um novo usuário', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.signup-form > h2').should('contain.text', 'New User Signup!');

        cy.get('[data-qa="signup-name"]').type('Fulano da Silva');

        cy.get('[data-qa="signup-email"]').type(`pgats-aut-+${Date.now()}@gmail.com`);

        cy.get('[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check();

        cy.get(':nth-child(1) > b').should('contain.text', 'Enter Account Information');

        cy.get('[data-qa="password"]').type('1234567');

        cy.get('[data-qa="days"]').select('5');

        cy.get('[data-qa="months"]').select('7');

        cy.get('[data-qa="years"]').select('1977');

        cy.get('#newsletter').check();

        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('Fulano');

        cy.get('[data-qa="last_name"]').type('da Silva');

        cy.get('[data-qa="company"]').type('Empresa de Fulano');

        cy.get('[data-qa="address"]').type('Rua dos Fulanos, 165');

        cy.get('[data-qa="country"]').select('United States');

        cy.get('[data-qa="state"]').type('California');

        cy.get('[data-qa="city"]').type('Los Angeles');

        cy.get('[data-qa="zipcode"]').type('90001');

        cy.get('[data-qa="mobile_number"]').type('+1 1234567890');

        cy.get('[data-qa="create-account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Created!');

        cy.get('[data-qa="continue-button"]').click();

        cy.get(':nth-child(10) > a').should('contain.text', ' Logged in as Fulano da Silva');

        cy.get('a[href="/delete_account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Deleted!');

        cy.get('[data-qa="continue-button"]').click();
    });

    it('Login do usuário com e-mail e senha corretos', () => {

        const email = `pgats-aut-${Date.now()}@gmail.com`;
        const password = '1234567';

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('[data-qa="signup-name"]').type('Fulano da Silva');

        cy.get('[data-qa="signup-email"]').type(email);

        cy.get('[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check();

        cy.get(':nth-child(1) > b').should('contain.text', 'Enter Account Information');

        cy.get('[data-qa="password"]').type(password);

        cy.get('[data-qa="days"]').select('5');

        cy.get('[data-qa="months"]').select('7');

        cy.get('[data-qa="years"]').select('1977');

        cy.get('#newsletter').check();

        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('Fulano');

        cy.get('[data-qa="last_name"]').type('da Silva');

        cy.get('[data-qa="company"]').type('Empresa de Fulano');

        cy.get('[data-qa="address"]').type('Rua dos Fulanos, 165');

        cy.get('[data-qa="country"]').select('United States');

        cy.get('[data-qa="state"]').type('California');

        cy.get('[data-qa="city"]').type('Los Angeles');

        cy.get('[data-qa="zipcode"]').type('90001');

        cy.get('[data-qa="mobile_number"]').type('+1 1234567890');

        cy.get('[data-qa="create-account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Created!');

        cy.get('[data-qa="continue-button"]').click();

        cy.get('a[href*=logout]').click();


        // realizar o login do usuário com e-mail e senha corretos

        //cy.get('a[href*=login]').click();

        cy.get('.login-form > h2').should('contain.text', 'Login to your account');

        cy.get('[data-qa="login-email"]').type(email);

        cy.get('[data-qa="login-password"]').type(password);

        cy.get('[data-qa="login-button"]').click();

        cy.get(':nth-child(10) > a').should('contain.text', ' Logged in as Fulano da Silva');

        cy.get('a[href="/delete_account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Deleted!');

    });

    it('Login do usuário com e-mail e senha incorretos', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.login-form > h2').should('contain.text', 'Login to your account');

        cy.get('[data-qa="login-email"]').type('pgats@gmail.com');

        cy.get('[data-qa="login-password"]').type('wrongpassword');

        cy.get('[data-qa="login-button"]').click();

        cy.get('.login-form > form > p').should('contain.text', 'Your email or password is incorrect!');

    });

    it('Fazer logout do usuário', () => {

        const email = 'aut-pgats-008@test.com';
        const password = '1234567';

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.login-form > h2').should('contain.text', 'Login to your account');

        cy.get('[data-qa="login-email"]').type(email);

        cy.get('[data-qa="login-password"]').type(password);

        cy.get('[data-qa="login-button"]').click();

        cy.get(':nth-child(10) > a').should('contain.text', ' Logged in as Auth PGATS');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=logout]').click();

        cy.get('.login-form > h2').should('contain.text', 'Login to your account');
    });

    it.only('Cadastrar um usuário com e-mail existente', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.signup-form > h2').should('contain.text', 'New User Signup!');

        cy.get('[data-qa="signup-name"]').type('PGATS');

        cy.get('[data-qa="signup-email"]').type('aut-pgats-008@test.com');

        cy.get('[data-qa="signup-button"]').click();

        cy.get('.signup-form > form > p').should('contain.text', 'Email Address already exist!');

    });

});