/// <reference types="cypress" />

import { loginPage } from '../../modules/login';
import { cadastroPage } from '../../modules/cadastro';
import { produtosPage } from '../../modules/produtos';
import { carrinhoPage } from '../../modules/carrinho';
import { pagamentoPage } from '../../modules/pagamento';


describe('Testes e validações - Automation Exercises', () => {
    it('Cadastrar um novo usuário', () => {

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        cadastroPage.titulo.should('contain.text', 'New User Signup!');

        cadastroPage.iniciarCadastro('Fulano da Silva', `pgats-aut-${Date.now()}@gmail.com`);

        cy.location('pathname').should('eq', '/signup');

        cadastroPage.tituloInformacoes.should('be.visible');

        cadastroPage.preencherCadastro({
            titulo: 'Mr',
            senha: '1234567',
            dia: '5',
            mes: '7',
            ano: '1977',
            newsletter: true,
            ofertas: true,
            nome: 'Fulano',
            sobrenome: 'da Silva',
            empresa: 'Empresa de Fulano',
            endereco: 'Rua dos Fulanos, 165',
            pais: 'United States',
            estado: 'California',
            cidade: 'Los Angeles',
            cep: '90001',
            telefone: '+1 1234567890'
        });

        cadastroPage.criarConta();

        cadastroPage.mensagemContaCriada
            .should('be.visible')
            .and('contain.text', 'Account Created!');

        cadastroPage.continuar();

        cy.contains('.shop-menu a', 'Logged in as Fulano da Silva', { timeout: 15000 }).should('be.visible');

        cy.get('a[href="/delete_account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Deleted!');

        cy.get('[data-qa="continue-button"]').click();
    });

    it('Login do usuário com e-mail e senha corretos', () => {

        const email = `pgats-aut-${Date.now()}@gmail.com`;
        const password = '1234567';

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        cadastroPage.iniciarCadastro('Fulano da Silva', email);

        cadastroPage.tituloInformacoes.should('be.visible');

        cadastroPage.preencherCadastro({
            titulo: 'Mr',
            senha: password,
            dia: '5',
            mes: '7',
            ano: '1977',
            newsletter: true,
            ofertas: true,
            nome: 'Fulano',
            sobrenome: 'da Silva',
            empresa: 'Empresa de Fulano',
            endereco: 'Rua dos Fulanos, 165',
            pais: 'United States',
            estado: 'California',
            cidade: 'Los Angeles',
            cep: '90001',
            telefone: '+1 1234567890'
        });

        cadastroPage.criarConta();

        cadastroPage.mensagemContaCriada
            .should('be.visible')
            .and('contain.text', 'Account Created!');

        cadastroPage.continuar();

        cy.contains('.shop-menu a', 'Logged in as Fulano da Silva', { timeout: 15000 })
            .should('be.visible');

        loginPage.sair();


        // realizar o login do usuário com e-mail e senha corretos

        loginPage.titulo.should('contain.text', 'Login to your account');

        loginPage.preencherEmail(email);

        loginPage.preencherSenha(password);

        loginPage.entrar();

        cy.contains('.shop-menu a', 'Logged in as Fulano da Silva', { timeout: 15000 }).should('be.visible');

        cy.get('a[href="/delete_account"]').click();

        cy.get('.title > b').should('contain.text', 'Account Deleted!');

    });

    it('Login do usuário com e-mail e senha incorretos', () => {

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        loginPage.titulo.should('contain.text', 'Login to your account');

        loginPage.preencherEmail('pgats@gmail.com');

        loginPage.preencherSenha('wrongpassword');

        loginPage.entrar();

        loginPage.mensagemDeErro.should('contain.text', 'Your email or password is incorrect!');

    });

    it('Fazer logout do usuário', () => {

        const email = 'aut-pgats-008@test.com';
        const password = '1234567';

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        loginPage.titulo.should('contain.text', 'Login to your account');

        loginPage.preencherEmail(email);

        loginPage.preencherSenha(password);

        loginPage.entrar();

        cy.contains('.shop-menu a', 'Logged in as Auth PGATS', { timeout: 15000 }).should('be.visible');

        cy.get('a > img').should('be.visible');

        loginPage.sair();

        loginPage.titulo.should('contain.text', 'Login to your account');
    });

    it('Cadastrar um usuário com e-mail existente', () => {

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        cadastroPage.titulo.should('contain.text', 'New User Signup!');

        cadastroPage.iniciarCadastro('PGATS', 'aut-pgats-008@test.com');

        cadastroPage.mensagemDeErro.should('contain.text', 'Email Address already exist!');

    });

    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        cy.visit('/');

        cy.get('a > img').should('be.visible');

        produtosPage.acessarPeloMenu();

        produtosPage.titulo.should('be.visible');

        produtosPage.lista.should('be.visible');

        produtosPage.produtos.should('have.length.greaterThan', 0);

        produtosPage.abrirDetalhes(0);

        produtosPage.detalhes.within(() => {

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

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        produtosPage.acessarPeloMenu();

        produtosPage.titulo.should('be.visible');

        produtosPage.pesquisar('Blue Top');

        produtosPage.tituloResultados.should('be.visible');

        produtosPage.produtos.should('have.length.greaterThan', 0).each(($produto) => {
            cy.wrap($produto)
                .should('be.visible')
                .find('.productinfo p')
                .should('be.visible')
                .and('contain.text', 'Blue Top');
        });

    });

    it('Verificar assinatura na página inicial', () => {

        cy.visit('/');

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

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        cadastroPage.titulo.should('contain.text', 'New User Signup!');

        cadastroPage.iniciarCadastro('Cyclano da Silva', `pgats-aut-+${Date.now()}@gmail.com`);

        cadastroPage.tituloInformacoes.should('be.visible');

        cadastroPage.preencherCadastro({
            titulo: 'Mr',
            senha: '1234567',
            dia: '5',
            mes: '7',
            ano: '1977',
            newsletter: true,
            ofertas: true,
            nome: 'Cyclano',
            sobrenome: 'da Silva',
            empresa: 'Empresa de Cyclano',
            endereco: 'Rua dos Fulanos, 165',
            pais: 'United States',
            estado: 'California',
            cidade: 'Los Angeles',
            cep: '90001',
            telefone: '+1 1234567890'
        });

        cadastroPage.criarConta();

        cadastroPage.mensagemContaCriada.should('be.visible').and('contain.text', 'Account Created!');

        cadastroPage.continuar();

        cy.contains('.shop-menu a', 'Logged in as Cyclano da Silva', { timeout: 15000 }).should('be.visible');

        produtosPage.acessarPeloMenu();

        produtosPage.titulo.should('be.visible');

        produtosPage.lista.should('be.visible');

        produtosPage.produtos.should('have.length.greaterThan', 0);

        produtosPage.produtos
            .should('have.length.at.least', 3);

        for (let indice = 0; indice < 3; indice++) {
            produtosPage.adicionarAoCarrinho(indice);
            produtosPage.continuarComprando();
        }

        carrinhoPage.acessarPeloMenu();
        carrinhoPage.conteudo.should('be.visible');

        carrinhoPage.prosseguirParaCheckout();

        carrinhoPage.tituloEnderecos.should('be.visible');

        carrinhoPage.enderecos.each(($endereco) => {
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

        carrinhoPage.tituloRevisao.should('be.visible');

        carrinhoPage.produtos.should('have.length', 3)
            .each(($produto) => {
                cy.wrap($produto).within(() => {
                    cy.get('.cart_description a').should('be.visible');
                    cy.get('.cart_price').should('contain.text', 'Rs.');
                    cy.get('.cart_quantity').should('contain.text', '1');
                    cy.get('.cart_total_price').should('contain.text', 'Rs.');
                });
            });

        carrinhoPage.preencherComentario('Por favor, entregar o pedido em horário comercial.');

        carrinhoPage.fazerPedido();

        pagamentoPage.preencherDados({
            nomeNoCartao: 'Cyclano da Silva',
            numero: '4111111111111111',
            cvc: '123',
            mesValidade: '12',
            anoValidade: '2030'
        });

        pagamentoPage.pagarEConfirmarPedido();

        pagamentoPage.mensagemConfirmacao
            .should('be.visible');

        cy.get('a[href="/delete_account"]').click();

        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');

        cy.get('[data-qa="continue-button"]').click();

    });

    it('Fazer pedido: Faça login antes de finalizar a compra', () => {

        cy.visit('/');

        cy.get('a > img').should('be.visible');

        loginPage.acessarPeloMenu();

        loginPage.titulo.should('contain.text', 'Login to your account');

        loginPage.preencherEmail('aut-pgats-008@test.com');

        loginPage.preencherSenha('1234567');

        loginPage.entrar();

        cy.contains('.shop-menu a', 'Logged in as Auth PGATS', { timeout: 15000 }).should('be.visible');

        produtosPage.acessarPeloMenu();

        produtosPage.titulo.should('be.visible');

        produtosPage.lista.should('be.visible');

        produtosPage.produtos.should('have.length.greaterThan', 0);

        produtosPage.produtos
            .should('have.length.at.least', 3);

        for (let indice = 0; indice < 3; indice++) {
            produtosPage.adicionarAoCarrinho(indice);
            produtosPage.continuarComprando();
        }

        carrinhoPage.acessarPeloMenu();
        carrinhoPage.conteudo.should('be.visible');

        carrinhoPage.prosseguirParaCheckout();

        carrinhoPage.tituloEnderecos.should('be.visible');

        carrinhoPage.enderecos.each(($endereco) => {
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

        carrinhoPage.tituloRevisao.should('be.visible');

        carrinhoPage.produtos.should('have.length', 3)
            .each(($produto) => {
                cy.wrap($produto).within(() => {
                    cy.get('.cart_description a').should('be.visible');
                    cy.get('.cart_price').should('contain.text', 'Rs.');
                    cy.get('.cart_total_price').should('contain.text', 'Rs.');
                });
            });

        carrinhoPage.preencherComentario('Por favor, entregar o pedido em horário comercial.');

        carrinhoPage.fazerPedido();

        pagamentoPage.preencherDados({
            nomeNoCartao: 'Cyclano da Silva',
            numero: '4111111111111111',
            cvc: '123',
            mesValidade: '12',
            anoValidade: '2030'
        });

        pagamentoPage.pagarEConfirmarPedido();

        pagamentoPage.mensagemConfirmacao
            .should('be.visible');

    });

});
