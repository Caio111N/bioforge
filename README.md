# Bioforge

**Bioforge é um gerador de bio para LinkedIn que cria headline, seção Sobre e versão curta a partir de informações profissionais fornecidas pelo usuário.**

## Sobre o projeto

O Bioforge ajuda a transformar informações profissionais básicas em uma apresentação pronta para revisão e uso no LinkedIn. A geração acontece localmente no navegador por meio de templates de texto predefinidos, sem inteligência artificial. Nenhuma informação é enviada para servidores.

## Funcionalidades

- Geração de headline para LinkedIn.
- Geração do texto Sobre.
- Geração de versão curta.
- Modelos para diferentes áreas profissionais.
- Personalização por momento de carreira.
- Personalização por objetivo profissional.
- Seleção de diferentes tons de escrita.
- Inclusão de habilidades informadas pelo usuário.
- Geração reproduzível de novas versões.
- Cópia rápida dos textos.
- Contadores de caracteres com indicação de limite.
- Modo claro ou escuro automático conforme o sistema.
- Funcionamento offline, sem servidor.
- Interface responsiva para desktop e dispositivos móveis.

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js para execução dos testes
- `node:test` para os testes automatizados

O projeto não utiliza React, Vue, Angular, frameworks, bibliotecas externas, APIs, backend ou banco de dados.

## Como executar

### Opção 1 — Abrir diretamente

Abra o arquivo `index.html` diretamente no navegador. A interface funciona localmente e não requer instalação ou compilação.

### Opção 2 — VS Code

Abra a pasta do projeto no VS Code e inicie `index.html` com a extensão Live Server.

### Testes

Com Node.js instalado, execute na pasta do projeto:

```sh
npm test
```

Os testes usam o módulo nativo `node:test`; não é necessário instalar dependências.

## Exemplo de uso

**Área:** Tecnologia da Informação

**Momento:** Estudante buscando estágio

**Habilidades:** JavaScript, SQL, Git

Ao preencher os dados, o Bioforge gera automaticamente uma headline, um texto Sobre e uma versão curta. Os textos podem ser revisados e copiados separadamente.

## Privacidade

> Seus dados ficam somente no navegador. Nada é enviado para servidores.

O projeto não utiliza `localStorage`, cookies, analytics, APIs externas ou banco de dados. As informações existem apenas na página enquanto ela está aberta.

## Limitações

- A geração utiliza templates predefinidos por área e tom.
- O projeto não utiliza IA generativa.
- A qualidade da bio depende das informações fornecidas e da revisão do usuário.
- As informações não são armazenadas após o uso da página.

## Estrutura do projeto

```text
bioforge/
├── index.html
├── style.css
├── generator.js
├── data.js
├── app.js
├── test/
│   └── generator.test.js
├── package.json
├── README.md
└── .gitignore
```

- `index.html`: estrutura e campos da interface.
- `style.css`: identidade visual, temas e layout responsivo.
- `generator.js`: funções puras de composição dos textos.
- `data.js`: opções, vocabulário e templates locais.
- `app.js`: eventos, prévia, etiquetas, contadores e cópia.
- `test/generator.test.js`: testes da lógica de geração com `node:test`.
- `package.json`: metadados e comando de testes.
- `README.md`: documentação do projeto.
- `.gitignore`: arquivos locais que não devem entrar no Git.

## Testes

Execute:

```sh
npm test
```

## GitHub

Repositório público: [github.com/Caio111N/bioforge](https://github.com/Caio111N/bioforge).

## Licença

Nenhuma licença específica foi definida para este projeto.