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

    it('Cadastrar um usuário com e-mail existente', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.signup-form > h2').should('contain.text', 'New User Signup!');

        cy.get('[data-qa="signup-name"]').type('PGATS');

        cy.get('[data-qa="signup-email"]').type('aut-pgats-008@test.com');

        cy.get('[data-qa="signup-button"]').click();

        cy.get('.signup-form > form > p').should('contain.text', 'Email Address already exist!');

    });

    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href="/products"]').should('have.length', 1).click();

        cy.contains('h2.title', 'All Products').should('be.visible');

        cy.get('.features_items').should('be.visible');

        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);

        cy.get('.features_items .product-image-wrapper').first().contains('a', 'View Product').click();

        cy.get('.product-information').within(() => {

            cy.get('h2')
                .should('be.visible')
                .and('have.text', 'Blue Top');

            cy.contains('p', 'Category:')
                .should('be.visible')
                .and('contain.text', 'Women > Tops');

            cy.contains('span', /Rs\.\s*\d+/)
                .should('be.visible')
                .and('contain.text', 'Rs. 500');

            cy.contains('p', 'Availability:')
                .should('be.visible')
                .and('contain.text', 'In Stock');

            cy.contains('p', 'Condition:')
                .should('be.visible')
                .and('contain.text', 'New');

            cy.contains('p', 'Brand:')
                .should('be.visible')
                .and('contain.text', 'Polo');
        });
    });

    it('Pesquisar produto', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href="/products"]').should('have.length', 1).click();

        cy.contains('h2.title', 'All Products').should('be.visible');

        cy.get('#search_product').type('Blue Top');

        cy.get('#submit_search').click();

        cy.contains('h2.title', 'Searched Products').should('be.visible');

        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0).each(($produto) => {
            cy.wrap($produto)
                .should('be.visible')
                .find('.productinfo p')
                .should('be.visible')
                .and('contain.text', 'Blue Top');
        });

    });

    it('Verificar assinatura na página inicial', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('#footer').scrollIntoView();

        cy.get('#footer').scrollIntoView().should('be.visible');

        cy.get('#footer').within(() => {
            cy.get('h2').should('contain.text', 'Subscription');
        });

        cy.get('#susbscribe_email').type(`pgats-aut-+${Date.now()}@gmail.com`);

        cy.get('#subscribe').click();

        cy.get('#success-subscribe').should('be.visible').and('contain.text', 'You have been successfully subscribed!');


    });

    it('Fazer pedido: Registrar-se antes de finalizar a compra', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.signup-form > h2').should('contain.text', 'New User Signup!');

        cy.get('[data-qa="signup-name"]').type('Cyclano da Silva');

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

        cy.get('[data-qa="first_name"]').type('Cyclano');

        cy.get('[data-qa="last_name"]').type('da Silva');

        cy.get('[data-qa="company"]').type('Empresa de Cyclano');

        cy.get('[data-qa="address"]').type('Rua dos Fulanos, 165');

        cy.get('[data-qa="country"]').select('United States');

        cy.get('[data-qa="state"]').type('California');

        cy.get('[data-qa="city"]').type('Los Angeles');

        cy.get('[data-qa="zipcode"]').type('90001');

        cy.get('[data-qa="mobile_number"]').type('+1 1234567890');

        cy.get('[data-qa="create-account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Created!');

        cy.get('[data-qa="continue-button"]').click();

        cy.get(':nth-child(10) > a').should('contain.text', ' Logged in as Cyclano da Silva');

        cy.get('a[href="/products"]').should('have.length', 1).click();

        cy.contains('h2.title', 'All Products').should('be.visible');

        cy.get('.features_items').should('be.visible');

        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.at.least', 3);

        for (let indice = 0; indice < 3; indice++) {
            cy.get('.features_items .product-image-wrapper')
                .eq(indice)
                .find('.productinfo .add-to-cart')
                .click();

            cy.contains('button', 'Continue Shopping')
                .should('be.visible')
                .click();

            cy.get('#cartModal').should('not.be.visible');
        }

        cy.get('.shop-menu a[href="/view_cart"]').should('have.length', 1).click();

        cy.location('pathname').should('eq', '/view_cart');
        cy.get('#cart_items').should('be.visible');

        cy.contains('a', 'Proceed To Checkout').should('be.visible').click();

        cy.location('pathname').should('eq', '/checkout');

        cy.contains('h2', 'Address Details').should('be.visible');

        cy.get('#address_delivery, #address_invoice').each(($endereco) => {
            cy.wrap($endereco)
                .should('be.visible')
                .and('contain.text', 'Cyclano da Silva')
                .and('contain.text', 'Empresa de Cyclano')
                .and('contain.text', 'Rua dos Fulanos, 165')
                .and('contain.text', 'Los Angeles')
                .and('contain.text', 'California')
                .and('contain.text', '90001')
                .and('contain.text', 'United States')
                .and('contain.text', '+1 1234567890');
        });

        cy.contains('h2', 'Review Your Order').should('be.visible');

        cy.get('#cart_info tbody tr[id^="product-"]').should('have.length', 3)
            .each(($produto) => {
                cy.wrap($produto).within(() => {
                    cy.get('.cart_description a').should('be.visible');
                    cy.get('.cart_price').should('contain.text', 'Rs.');
                    cy.get('.cart_quantity').should('contain.text', '1');
                    cy.get('.cart_total_price').should('contain.text', 'Rs.');
                });
            });

        cy.get('textarea[name="message"]').should('be.visible').type('Por favor, entregar o pedido em horário comercial.');

        cy.contains('a', 'Place Order').should('be.visible').click();

        cy.get('[data-qa="name-on-card"]').type('Cyclano da Silva');

        cy.get('[data-qa="card-number"]').type('4111111111111111');

        cy.get('[data-qa="cvc"]').type('123');

        cy.get('[data-qa="expiry-month"]').type('12');

        cy.get('[data-qa="expiry-year"]').type('2030');

        cy.get('[data-qa="pay-button"]').should('be.visible').click();

        cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

        cy.get('a[href="/delete_account"]').click();

        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');

        cy.get('[data-qa="continue-button"]').click();

    });

    it('Fazer pedido: Faça login antes de finalizar a compra', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a > img').should('be.visible');

        cy.get('a[href*=login]').click();

        cy.get('.login-form > h2').should('contain.text', 'Login to your account');

        cy.get('[data-qa="login-email"]').type('aut-pgats-008@test.com');

        cy.get('[data-qa="login-password"]').type('1234567');

        cy.get('[data-qa="login-button"]').click();

        cy.get(':nth-child(10) > a').should('contain.text', ' Logged in as Auth PGATS');

        cy.get('a[href="/products"]').should('have.length', 1).click();

        cy.contains('h2.title', 'All Products').should('be.visible');

        cy.get('.features_items').should('be.visible');

        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.at.least', 3);

        for (let indice = 0; indice < 3; indice++) {
            cy.get('.features_items .product-image-wrapper')
                .eq(indice)
                .find('.productinfo .add-to-cart')
                .click();

            cy.contains('button', 'Continue Shopping')
                .should('be.visible')
                .click();

            cy.get('#cartModal').should('not.be.visible');
        }

        cy.get('.shop-menu a[href="/view_cart"]').should('have.length', 1).click();

        cy.location('pathname').should('eq', '/view_cart');
        cy.get('#cart_items').should('be.visible');

        cy.contains('a', 'Proceed To Checkout').should('be.visible').click();

        cy.location('pathname').should('eq', '/checkout');

        cy.contains('h2', 'Address Details').should('be.visible');

        cy.get('#address_delivery, #address_invoice').each(($endereco) => {
            cy.wrap($endereco)
                .should('be.visible')
                .and('contain.text', 'Cyclano da Silva')
                .and('contain.text', 'Empresa de Cyclano')
                .and('contain.text', 'Rua dos Cyclanos, 165')
                .and('contain.text', 'Los Angeles')
                .and('contain.text', 'California')
                .and('contain.text', '90001')
                .and('contain.text', 'United States')
                .and('contain.text', '+1 1234567890');
        });

        cy.contains('h2', 'Review Your Order').should('be.visible');

        cy.get('#cart_info tbody tr[id^="product-"]').should('have.length', 3)
            .each(($produto) => {
                cy.wrap($produto).within(() => {
                    cy.get('.cart_description a').should('be.visible');
                    cy.get('.cart_price').should('contain.text', 'Rs.');
                    cy.get('.cart_total_price').should('contain.text', 'Rs.');
                });
            });

        cy.get('textarea[name="message"]').should('be.visible').type('Por favor, entregar o pedido em horário comercial.');

        cy.contains('a', 'Place Order').should('be.visible').click();

        cy.get('[data-qa="name-on-card"]').type('Cyclano da Silva');

        cy.get('[data-qa="card-number"]').type('4111111111111111');

        cy.get('[data-qa="cvc"]').type('123');

        cy.get('[data-qa="expiry-month"]').type('12');

        cy.get('[data-qa="expiry-year"]').type('2030');

        cy.get('[data-qa="pay-button"]').should('be.visible').click();

        cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

    });

});
