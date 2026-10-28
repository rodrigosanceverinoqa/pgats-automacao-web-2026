# Automação Web — Trabalho de Conclusão

Projeto acadêmico de testes de ponta a ponta (E2E) para o [Automation Exercise](https://automationexercise.com), desenvolvido na disciplina de Automação Web. A suíte cobre cadastro, autenticação, produtos, assinatura e compra.

## Tecnologias

- JavaScript e Cypress 13, conforme declarado no `package.json`.
- Page Object organizado em módulos por contexto.
- Fixtures para dados fictícios de pagamento.
- Cypress Mochawesome Reporter para relatórios HTML.
- GitHub Actions para integração contínua.

O `package-lock.json` registra as versões exatas instaladas com `npm ci`.

## Cenários automatizados

1. Cadastro de novo usuário.
2. Login com e-mail e senha corretos.
3. Login com e-mail e senha incorretos.
4. Logout.
5. Cadastro com e-mail existente.
6. Listagem de produtos e consulta aos detalhes de um produto.
7. Pesquisa de produto.
8. Assinatura da newsletter na página inicial.
9. Compra com cadastro antes da finalização.
10. Compra com login antes da finalização.

## Pré-requisitos

- Git.
- Node.js **v24.14.0**, utilizado no ambiente local do projeto, e npm.
- Acesso à internet e ao Automation Exercise.
- Google Chrome para executar com `--browser chrome`.

Não é necessário iniciar uma aplicação local: os testes acessam o site externo. Consulte os requisitos de sistema na [documentação de instalação do Cypress](https://docs.cypress.io/app/get-started/install-cypress).

## Instalação

Clone o repositório e acesse a branch do trabalho:

```bash
git clone https://github.com/rodrigosanceverinoqa/pgats-automacao-web-2026.git
cd pgats-automacao-web-2026
git switch trabalho-conclusao-automacao-web
npm ci
```

## Execução

### Modo interativo

```bash
npm run cy:open
```

Selecione **E2E Testing**, escolha o navegador e abra `automation-trabalhoFinal.cy.js`.

### Modo headless

Execute toda a suíte:

```bash
npm test
```

Para executar no Chrome:

```bash
npm test -- --browser chrome
```

Para executar explicitamente a spec do trabalho:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-trabalhoFinal.cy.js" --browser chrome
```

## Estrutura e arquitetura

```text
.github/workflows/cypress.yml       # Pipeline do GitHub Actions
cypress/
├── e2e/1-getting-started/
│   └── automation-trabalhoFinal.cy.js
├── fixtures/
│   └── pagamento.json             # Dados fictícios de pagamento
├── modules/
│   ├── cadastro/index.js
│   ├── carrinho/index.js          # Carrinho e checkout
│   ├── login/index.js
│   ├── pagamento/index.js
│   └── produtos/index.js
└── support/
    └── e2e.js                     # Registro do reporter
cypress.config.js
package.json
package-lock.json
```

As specs descrevem os cenários e verificam os resultados. Os módulos concentram seletores e ações reutilizáveis, recebendo dados por parâmetros. Os dados de pagamento ficam em uma fixture. Parte dos dados de cadastro e das verificações de interface ainda permanece na spec.

## Configuração e sincronização

A configuração principal fica em `cypress.config.js`:

| Configuração | Valor | Comportamento |
| --- | --- | --- |
| `baseUrl` | `https://automationexercise.com` | Permite visitas relativas, como `cy.visit('/')`. |
| `retries.runMode` | `1` | Uma tentativa adicional após falha no terminal e no CI. |
| `retries.openMode` | `0` | Não repete o teste inteiro no modo interativo. |
| `reporter` | `cypress-mochawesome-reporter` | Gera relatórios da execução. |

Os módulos usam esperas dinâmicas por elementos, URLs e respostas de requisições. Cadastro, login e adição ao carrinho utilizam `cy.intercept` e `cy.wait` com aliases. A execução continua quando a condição é atendida; não são pausas fixas. Os retries do teste inteiro são um mecanismo separado.

## Dados de teste e limitações

- Utilize somente dados sintéticos. A fixture de pagamento é destinada ao ambiente de demonstração.
- Os cadastros geram e-mails com timestamp. Os cenários que criam contas incluem sua exclusão ao final; uma falha anterior à limpeza pode deixar a conta no site.
- Logout, cadastro com e-mail existente e compra com login dependem de uma conta previamente cadastrada. As credenciais dessa conta estão atualmente na spec; ainda não há configuração de credenciais por variáveis de ambiente.
- O carrinho da conta existente pode persistir entre execuções. Atualmente, o cenário de compra com login não esvazia o carrinho automaticamente. Execuções simultâneas com a mesma conta podem interferir entre si.
- Disponibilidade, anúncios e alterações no site externo podem afetar os resultados. Novas tentativas não substituem a investigação de falhas recorrentes.
- Fixtures são versionadas e não protegem segredos. Não inclua credenciais pessoais, dados de pessoas reais ou cartões reais no repositório.

## Relatórios

Após executar com `npm test`, os relatórios Mochawesome ficam em `cypress/reports/`. Abra o arquivo HTML gerado no navegador, mantendo os arquivos auxiliares junto dele.

Relatórios, screenshots e vídeos estão no `.gitignore`. As evidências só estarão disponíveis quando geradas pela execução e pela configuração do Cypress.

## GitHub Actions

O workflow [cypress.yml](.github/workflows/cypress.yml):

- Executa a cada push em qualquer branch.
- Permite execução manual com `workflow_dispatch`.
- Usa Ubuntu e Chrome, instala dependências com `npm ci` e executa a spec do trabalho.
- Tenta publicar relatórios e evidências disponíveis mesmo quando há falhas.
- Mantém o artefato `resultados-cypress` por 14 dias.

### Execução manual

No GitHub, abra **Actions → Testes Cypress → Run workflow**, selecione a branch e confirme. Para disponibilizar o botão, o workflow precisa existir na branch padrão do repositório. A branch selecionada também deve conter os arquivos necessários aos testes.

### Download dos resultados

Abra a execução em **Actions**, localize **Artifacts** e baixe `resultados-cypress`. Extraia o ZIP e abra o HTML da pasta de relatórios. Se o Cypress não chegar a executar, o relatório pode não ser gerado; consulte os logs do job.

## Manutenção

- Atualize o módulo correspondente ao alterar uma interação reutilizada ou seu seletor.
- Preserve as verificações de resultado nos cenários.
- Execute a suíte antes de enviar alterações e confira o resultado do CI.
- Não envie `it.only` ou `describe.only`, pois limitam os cenários executados.
- Versione o `package-lock.json` junto de alterações nas dependências.

## Autoria

[Rodrigo Sanceverino](https://github.com/rodrigosanceverinoqa) — trabalho acadêmico de Automação Web.
