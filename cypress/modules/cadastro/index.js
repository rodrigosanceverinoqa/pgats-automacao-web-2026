export function iniciarCadastro(nome, email) {
    cy.get('a > img').should('be.visible');

    cy.get('a[href*=login]').click();

    cy.get('.signup-form > h2')
        .should('contain.text', 'New User Signup!');

    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

export function preencherCadastro(senha) {
    cy.get('#id_gender1').check();

    cy.get(':nth-child(1) > b')
        .should('contain.text', 'Enter Account Information');

    cy.get('[data-qa="password"]').type(senha);
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
}

export function fazerLogout() {
    cy.get('a[href*=logout]').click();
}

export function fazerLogin(email, senha) {
    cy.get('.login-form > h2')
        .should('contain.text', 'Login to your account');

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);
    cy.get('[data-qa="login-button"]').click();
}

export function validarUsuarioLogado(nome) {
    cy.get(':nth-child(10) > a')
        .should('contain.text', `Logged in as ${nome}`);
}

export function excluirConta() {
    cy.get('a[href="/delete_account"]').click();

    cy.get('.title > b').should('contain.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
}