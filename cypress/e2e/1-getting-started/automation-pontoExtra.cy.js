/// <reference types="cypress" />
//require('cypress-xpath');

describe('Automation Exercises 2', {
    // Evita que anuncios de terceiros interfiram na navegacao dos testes.
    blockHosts: [
        '*.googlesyndication.com',
        '*.doubleclick.net',
    ],
}, () => {
    it('Cadastrar um novo usuário', () => {

        cy.visit('https://automationexercise.com/');

        cy.xpath('//*[@id="header"]/div/div/div/div[1]/div/a/img').should('be.visible');

        cy.xpath('//a[@href="/login"]').click();

        cy.location('pathname').should('eq', '/login');

        cy.document().xpath('//*[@id="form"]//div[contains(@class, "signup-form")]/h2')
            .should('contain.text', 'New User Signup!');

        cy.document().xpath('//input[@data-qa="signup-name"]').type('Fulano da Silva');

        cy.document().xpath('//input[@data-qa="signup-email"]').type(`pgats-aut-+${Date.now()}@gmail.com`);

        cy.document().xpath('//button[@data-qa="signup-button"]').click();

        cy.location('pathname').should('eq', '/signup');

        cy.document().xpath('//*[@id="id_gender1"]').check();

        cy.xpath('//*[@id="form"]/div/div/div/div[1]/h2/b').should('contain.text', 'Enter Account Information');

        cy.xpath('//*[@id="password"]').type('1234567');

        cy.xpath('//*[@id="days"]').select('5');

        cy.xpath('//*[@id="months"]').select('7');

        cy.xpath('//*[@id="years"]').select('1977');

        cy.xpath('//*[@id="newsletter"]').check();

        cy.xpath('//*[@id="optin"]').check();

        cy.xpath('//*[@id="first_name"]').type('Fulano');

        cy.xpath('//*[@id="last_name"]').type('da Silva');

        cy.xpath('//*[@id="company"]').type('Empresa de Fulano');

        cy.xpath('//*[@id="address1"]').type('Rua dos Fulanos, 165');

        cy.xpath('//*[@id="country"]').select('United States');

        cy.xpath('//*[@id="state"]').type('California');

        cy.xpath('//*[@id="city"]').type('Los Angeles');

        cy.xpath('//*[@id="zipcode"]').type('90001');

        cy.xpath('//*[@id="mobile_number"]').type('+1 1234567890');

        cy.xpath('//*[@id="form"]/div/div/div/div[1]/form/button').click();

        cy.location('pathname').should('eq', '/account_created');

        cy.document().xpath('//*[@data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');

        cy.xpath('//a[@data-qa="continue-button"]').click();

        cy.location('pathname').should('eq', '/');

        cy.document().xpath('//*[@id="header"]//a[contains(., "Logged in as")]')
            .should('be.visible')
            .and('contain.text', 'Logged in as Fulano da Silva');

        cy.xpath('//a[@href="/delete_account"]').click();

        cy.location('pathname').should('eq', '/delete_account');

        cy.document().xpath('//*[@data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');

        cy.xpath('//a[@data-qa="continue-button"]').click();
    });

    it('Login do usuário com e-mail e senha corretos', () => {

        const email = `pgats-aut-${Date.now()}@gmail.com`;
        const password = '1234567';

        cy.visit('https://automationexercise.com/');

        cy.xpath('//*[@id="header"]/div/div/div/div[1]/div/a/img').should('be.visible');

        cy.xpath('//a[@href="/login"]').click();

        cy.location('pathname').should('eq', '/login');

        cy.document().xpath('//*[@id="form"]//div[contains(@class, "signup-form")]/h2')
            .should('contain.text', 'New User Signup!');

        cy.document().xpath('//input[@data-qa="signup-name"]').type('Fulano da Silva');

        cy.document().xpath('//input[@data-qa="signup-email"]').type(email);

        cy.document().xpath('//button[@data-qa="signup-button"]').click();

        cy.location('pathname').should('eq', '/signup');

        cy.document().xpath('//*[@id="id_gender1"]').check();

        cy.xpath('//*[@id="form"]/div/div/div/div[1]/h2/b').should('contain.text', 'Enter Account Information');

        cy.xpath('//*[@id="password"]').type(password);

        cy.xpath('//*[@id="days"]').select('5');

        cy.xpath('//*[@id="months"]').select('7');

        cy.xpath('//*[@id="years"]').select('1977');

        cy.xpath('//*[@id="newsletter"]').check();

        cy.xpath('//*[@id="optin"]').check();

        cy.xpath('//*[@id="first_name"]').type('Fulano');

        cy.xpath('//*[@id="last_name"]').type('da Silva');

        cy.xpath('//*[@id="company"]').type('Empresa de Fulano');

        cy.xpath('//*[@id="address1"]').type('Rua dos Fulanos, 165');

        cy.xpath('//*[@id="country"]').select('United States');

        cy.xpath('//*[@id="state"]').type('California');

        cy.xpath('//*[@id="city"]').type('Los Angeles');

        cy.xpath('//*[@id="zipcode"]').type('90001');

        cy.xpath('//*[@id="mobile_number"]').type('+1 1234567890');

        cy.xpath('//*[@id="form"]/div/div/div/div[1]/form/button').click();

        cy.location('pathname').should('eq', '/account_created');

        cy.document().xpath('//*[@data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');

        cy.xpath('//a[@data-qa="continue-button"]').click();

        cy.xpath('//a[@href="/logout"]').click();

        // realizar o login do usuário com e-mail e senha corretos

        cy.location('pathname').should('eq', '/login');

        cy.xpath('//div[@class="login-form"]/h2').should('contain.text', 'Login to your account');

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type(email);

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type(password);

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click();

        cy.xpath('//*[@id="header"]//a[contains(., "Logged in as")]').should('contain.text', 'Fulano da Silva');

        cy.xpath('//a[@href="/delete_account"]').click();

        cy.xpath('//*[@id="form"]/div/div/div/h2/b').should('contain.text', 'Account Deleted!');

    });

    it('Login do usuário com e-mail e senha incorretos', () => {

        cy.visit('https://automationexercise.com/');

        cy.xpath('//a[@href="/login"]').click();

        cy.xpath('//div[@class="login-form"]/h2').should('contain.text', 'Login to your account');

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('pgats@gmail.com');

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('wrongpassword');

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click();

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/p').should('contain.text', 'Your email or password is incorrect!');

    });

    it('Fazer logout do usuário', () => {

        const email = 'aut-pgats-008@test.com';
        const password = '1234567';

        cy.visit('https://automationexercise.com/');

        cy.xpath('//*[@id="header"]/div/div/div/div[1]/div/a/img').should('be.visible');

        cy.xpath('//a[@href="/login"]').click();

        cy.location('pathname').should('eq', '/login');

        cy.xpath('//input[@data-qa="login-email"]').type(email);
        cy.xpath('//input[@data-qa="login-password"]').type(password);
        cy.xpath('//button[@data-qa="login-button"]').click();

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a').should('contain.text', ' Logged in as Auth PGATS');

        cy.xpath('//*[@id="header"]/div/div/div/div[1]/div/a/img').should('be.visible');

        cy.xpath('//a[@href="/logout"]').click();

        cy.xpath('//div[@class="login-form"]/h2').should('contain.text', 'Login to your account');

    });

    it('Cadastrar um usuário com e-mail existente', () => {

        cy.visit('https://automationexercise.com/');

        cy.xpath('//*[@id="header"]/div/div/div/div[1]/div/a/img').should('be.visible');

        cy.xpath('//a[@href="/login"]').click();

        cy.location('pathname').should('eq', '/login');

        cy.xpath('//div[@class="signup-form"]/h2').should('contain.text', 'New User Signup!');

        cy.xpath('//input[@data-qa="signup-name"]').type('PGATS');

        cy.xpath('//input[@data-qa="signup-email"]').type('aut-pgats-008@test.com');

        cy.xpath('//button[@data-qa="signup-button"]').click();

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/p').should('be.visible').and('contain.text', 'Email Address already exist!');
        //*[@id="form"]/div/div/div[3]/div/form/p
    });

});
