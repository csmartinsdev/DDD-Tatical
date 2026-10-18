# DDD Tático

Projeto de estudos em Domain-Driven Design com TypeScript, Sequelize e SQLite.

## Requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Rodando os testes

```bash
npm test
```

Ou para executar uma suíte específica:

```bash
npm test -- --runTestsByPath src/infrastructure/repository/order.repository.spec.ts
```

## Estrutura básica

- `src/domain`: entidades e regras de domínio
- `src/infrastructure`: repositórios e integrações com banco de dados
- `src/infrastructure/database`: modelos Sequelize

## Observação

Se você estiver em um ambiente novo, confirme que as dependências foram instaladas antes de rodar os testes.
