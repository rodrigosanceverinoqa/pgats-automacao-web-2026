/// <reference types="cypress" />

export const pagamentoPage = {
    preencherDados(dados) {
        cy.get('[data-qa="name-on-card"]').type(dados.nomeNoCartao);
        cy.get('[data-qa="card-number"]').type(dados.numero);
        cy.get('[data-qa="cvc"]').type(dados.cvc);
        cy.get('[data-qa="expiry-month"]').type(dados.mesValidade);
        return cy.get('[data-qa="expiry-year"]').type(dados.anoValidade);
    },

    pagarEConfirmarPedido() {
        return cy.get('[data-qa="pay-button"]').should('be.visible').click();
    },

    get mensagemConfirmacao() {
        return cy.contains('p', 'Congratulations! Your order has been confirmed!', {
            timeout: 15000
        });
    }
};
