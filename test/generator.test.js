/**
 * bioforge/test/generator.test.js - testes da geração local com node:test.
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const dados = require("../data.js");
const { normalizarEntrada, gerarBio } = require("../generator.js");

/**
 * Monta uma entrada completa e previsível para os testes.
 * @param {object} [ajustes] Campos que substituem os valores padrão.
 * @returns {object} Entrada de teste.
 */
function entradaExemplo(ajustes = {}) {
  return {
    area: "Tecnologia da Informação",
    momento: "Estudante buscando estágio",
    nome: "Ana Lima",
    habilidades: ["JavaScript", "SQL", "Git"],
    objetivo: "Conseguir um estágio ou primeira vaga",
    tom: "Profissional",
    formacao: "Análise e Desenvolvimento de Sistemas",
    cidade: "Recife",
    ...ajustes,
  };
}

/**
 * Verifica se os textos gerados não expõem marcadores de preenchimento.
 * @param {object} bio Resultado de gerarBio.
 * @returns {void}
 */
function verificarTextoLimpo(bio) {
  for (const texto of [bio.headline, bio.sobre, bio.curta]) {
    assert.doesNotMatch(texto, /undefined|null|\[|\]/i);
  }
}

test("respeita os limites de caracteres dos três formatos", () => {
  const bio = gerarBio(entradaExemplo(), 1);
  assert.ok(bio.headline.length <= 220);
  assert.ok(bio.sobre.length <= 2600);
  assert.ok(bio.curta.length <= 300);
  assert.deepEqual(bio.contagens, {
    headline: bio.headline.length,
    sobre: bio.sobre.length,
    curta: bio.curta.length,
  });
});

test("não deixa marcadores ou espaços vazios com campos opcionais em branco", () => {
  const bio = gerarBio(
    entradaExemplo({ nome: "  ", formacao: "", cidade: "" }),
    4,
  );
  verificarTextoLimpo(bio);
  assert.doesNotMatch(
    bio.sobre,
    /Meu nome é|Oi, sou|Minha formação inclui|Estou em Recife/,
  );
  assert.doesNotMatch(bio.sobre, /\n\n\n|  /);
});

test("repete o resultado para a mesma semente e varia para sementes adjacentes", () => {
  const entrada = entradaExemplo();
  assert.deepEqual(gerarBio(entrada, 18), gerarBio(entrada, 18));
  assert.notDeepEqual(gerarBio(entrada, 18), gerarBio(entrada, 19));
  assert.notDeepEqual(gerarBio(entrada, 1), gerarBio(entrada, 4));
});

test("inclui as habilidades informadas nos textos", () => {
  const bio = gerarBio(entradaExemplo(), 3);
  for (const habilidade of ["JavaScript", "SQL", "Git"]) {
    assert.ok(`${bio.headline} ${bio.sobre} ${bio.curta}`.includes(habilidade));
  }
});

test("normaliza espaços, capitalização e habilidades duplicadas", () => {
  const entrada = normalizarEntrada({
    area: "  tECNOLOGIA DA informação  ",
    momento: " estudante BUSCANDO estágio ",
    objetivo: "  FAZER NETWORKING ",
    tom: " direto E objetivo ",
    habilidades: " JavaScript , SQL, javascript ",
  });

  assert.equal(entrada.area, "Tecnologia da Informação");
  assert.equal(entrada.momento, "Estudante buscando estágio");
  assert.equal(entrada.objetivo, "Fazer networking");
  assert.equal(entrada.tom, "Direto e objetivo");
  assert.deepEqual(entrada.habilidades, ["JavaScript", "SQL"]);
});

test("limita a lista de habilidades a oito itens", () => {
  const habilidades = Array.from(
    { length: 10 },
    (_, indice) => `Habilidade ${indice + 1}`,
  );
  assert.equal(normalizarEntrada({ habilidades }).habilidades.length, 8);
});

test("todas as áreas e tons geram conteúdo válido", () => {
  for (const area of dados.opcoes.areas) {
    for (const tom of dados.opcoes.tons) {
      const bio = gerarBio(entradaExemplo({ area, tom }), 7);
      verificarTextoLimpo(bio);
      assert.ok(bio.headline.length > 0 && bio.headline.length <= 220);
      assert.ok(bio.sobre.length > 0 && bio.sobre.length <= 2600);
      assert.ok(bio.curta.length > 0 && bio.curta.length <= 300);
    }
  }
});

test("limita entradas extensas sem ultrapassar o máximo nem cortar palavras", () => {
  const bio = gerarBio(
    entradaExemplo({
      nome: `${"Nome ".repeat(100)}Pessoa`,
      formacao: "Formação ".repeat(500),
      cidade: "Cidade ".repeat(100),
    }),
    2,
  );
  assert.ok(bio.headline.length <= 220);
  assert.ok(bio.sobre.length <= 2600);
  assert.ok(bio.curta.length <= 300);
  verificarTextoLimpo(bio);
  assert.ok(!bio.sobre.endsWith(" "));
});
