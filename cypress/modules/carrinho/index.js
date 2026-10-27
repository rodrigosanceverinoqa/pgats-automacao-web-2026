/// <reference types="cypress" />

export const carrinhoPage = {
    acessarPeloMenu() {
        cy.get('.shop-menu a[href="/view_cart"]').should('have.length', 1).click();
        return cy.location('pathname', { timeout: 15000 }).should('eq', '/view_cart');
    },

    get conteudo() {
        return cy.get('#cart_items', { timeout: 15000 });
    },

    prosseguirParaCheckout() {
        cy.contains('a', 'Proceed To Checkout').should('be.visible').click();
        return cy.location('pathname', { timeout: 15000 }).should('eq', '/checkout');
    },

    get tituloEnderecos() {
        return cy.contains('h2', 'Address Details', { timeout: 15000 });
    },

    get enderecos() {
        return cy.get('#address_delivery, #address_invoice');
    },

    get tituloRevisao() {
        return cy.contains('h2', 'Review Your Order');
    },

    get produtos() {
        return cy.get('#cart_info tbody tr[id^="product-"]');
    },

    preencherComentario(comentario) {
        return cy.get('textarea[name="message"]')
            .should('be.visible')
            .clear()
            .type(comentario);
    },

    fazerPedido() {
        return cy.contains('a', 'Place Order').should('be.visible').click();
    }
};
