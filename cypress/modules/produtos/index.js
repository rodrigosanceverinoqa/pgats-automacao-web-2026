/// <reference types="cypress" />

export const produtosPage = {
    acessarPeloMenu() {
        cy.get('a[href="/products"]').should('have.length', 1).click();
        return cy.location('pathname', { timeout: 15000 }).should('eq', '/products');
    },

    get titulo() {
        return cy.contains('h2.title', 'All Products', { timeout: 15000 });
    },

    get tituloResultados() {
        return cy.contains('h2.title', 'Searched Products', { timeout: 15000 });
    },

    get lista() {
        return cy.get('.features_items');
    },

    get produtos() {
        return cy.get('.features_items .product-image-wrapper');
    },

    get detalhes() {
        return cy.get('.product-information', { timeout: 15000 });
    },

    pesquisar(nome) {
        cy.get('#search_product').clear().type(nome);
        return cy.get('#submit_search').click();
    },

    abrirDetalhes(indice) {
        return this.produtos.eq(indice).contains('a', 'View Product').click();
    },

    adicionarAoCarrinho(indice) {
        cy.intercept('GET', '**/add_to_cart/*').as('adicionarProduto');
        this.produtos.eq(indice).find('.productinfo .add-to-cart').click();
        cy.wait('@adicionarProduto', { responseTimeout: 60000 });
        return cy.get('#cartModal', { timeout: 15000 }).should('be.visible');
    },

    continuarComprando() {
        cy.get('#cartModal', { timeout: 15000 }).should('be.visible')
            .contains('button', 'Continue Shopping', { timeout: 15000 })
            .should('be.visible')
            .click();
        return cy.get('#cartModal').should('not.be.visible');
    }
};
