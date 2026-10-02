/**
 * bioforge/generator.js - geração pura e determinística das bios.
 * Não acessa o DOM, não persiste dados e não faz chamadas de rede.
 */
const dadosBioforge =
  typeof module !== "undefined" && module.exports
    ? require("./data.js")
    : globalThis.BioforgeData;

const limites = { headline: 220, sobre: 2600, curta: 300 };

/**
 * Normaliza campos, opções e habilidades sem alterar o objeto recebido.
 * @param {object} entrada Dados preenchidos pelo usuário.
 * @returns {{area: string, momento: string, nome: string, habilidades: string[], objetivo: string, tom: string, formacao: string, cidade: string}}
 */
function normalizarEntrada(entrada = {}) {
  const normalizarChave = (valor) =>
    String(valor ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ")
      .toLocaleLowerCase("pt-BR");

  const escolherOpcao = (valor, opcoes, padrao) => {
    const chave = normalizarChave(valor);
    return opcoes.find((opcao) => normalizarChave(opcao) === chave) || padrao;
  };

  const habilidadesBrutas = Array.isArray(entrada.habilidades)
    ? entrada.habilidades
    : String(entrada.habilidades ?? "").split(/[,\n;]/);
  const habilidades = [];
  for (const habilidade of habilidadesBrutas) {
    const limpa = String(habilidade ?? "")
      .trim()
      .replace(/\s+/g, " ");
    if (
      limpa &&
      !habilidades.some(
        (item) => normalizarChave(item) === normalizarChave(limpa),
      )
    ) {
      habilidades.push(limpa);
    }
    if (habilidades.length === 8) break;
  }

  const texto = (valor) =>
    String(valor ?? "")
      .trim()
      .replace(/\s+/g, " ");

  return {
    area: escolherOpcao(
      entrada.area,
      dadosBioforge.opcoes.areas,
      dadosBioforge.opcoes.areas[0],
    ),
    momento: escolherOpcao(
      entrada.momento,
      dadosBioforge.opcoes.momentos,
      dadosBioforge.opcoes.momentos[0],
    ),
    nome: texto(entrada.nome),
    habilidades,
    objetivo: escolherOpcao(
      entrada.objetivo,
      dadosBioforge.opcoes.objetivos,
      dadosBioforge.opcoes.objetivos[0],
    ),
    tom: escolherOpcao(
      entrada.tom,
      dadosBioforge.opcoes.tons,
      dadosBioforge.opcoes.tons[0],
    ),
    formacao: texto(entrada.formacao),
    cidade: texto(entrada.cidade),
  };
}

/**
 * Cria um índice reproduzível para números e textos usados como semente.
 * @param {number|string} semente Valor escolhido para variar os modelos.
 * @returns {number} Índice inteiro não negativo.
 */
function indiceDaSemente(semente) {
  let hash = 2166136261;
  for (const caractere of String(semente ?? "0")) {
    hash = Math.imul(hash ^ caractere.codePointAt(0), 16777619) >>> 0;
  }
  return hash;
}

/**
 * Seleciona uma variação sem aleatoriedade, permitindo reproduzir resultados.
 * @param {Array} opcoes Variações de texto.
 * @param {number} indice Índice inicial derivado da semente.
 * @param {number} deslocamento Deslocamento para variar cada bloco.
 * @returns {*} Variação selecionada.
 */
function selecionar(opcoes, indice, deslocamento) {
  const misturado =
    Math.imul(indice ^ Math.imul(deslocamento + 1, 0x9e3779b1), 0x85ebca6b) >>>
    0;
  return opcoes[misturado % opcoes.length];
}

/**
 * Substitui marcadores de modelo por valores já normalizados.
 * @param {string} modelo Texto com marcadores entre chaves.
 * @param {Record<string, string>} valores Valores dos marcadores.
 * @returns {string} Texto preenchido.
 */
function preencher(modelo, valores) {
  return modelo.replace(/\{([A-Za-z]+)\}/g, (_, chave) => valores[chave] ?? "");
}

/**
 * Encurta o texto removendo frases finais e, se necessário, preservando palavras.
 * @param {string} texto Texto a limitar.
 * @param {number} limite Número máximo de caracteres.
 * @returns {string} Texto dentro do limite.
 */
function limitarTexto(texto, limite) {
  const limpo = texto.trim();
  if (limpo.length <= limite) return limpo;

  const frases = limpo.split(/(?<=[.!?])\s+/u);
  let resultado = "";
  for (const frase of frases) {
    const candidato = resultado ? `${resultado} ${frase}` : frase;
    if (candidato.length > limite) break;
    resultado = candidato;
  }
  if (resultado) return resultado;

  const trecho = limpo.slice(0, Math.max(0, limite - 3));
  const fimDaPalavra = trecho.lastIndexOf(" ");
  if (fimDaPalavra < 1) return "";
  return `${trecho.slice(0, fimDaPalavra).replace(/[\s,;:.!?-]+$/u, "")}...`;
}

/**
 * Gera um título profissional com até 220 caracteres.
 * @param {object} entrada Campos do formulário ou entrada já normalizada.
 * @param {number|string} [semente=0] Semente reproduzível para escolher variações.
 * @returns {string} Headline pronta para copiar.
 */
function gerarHeadline(entrada, semente = 0) {
  const usuario = normalizarEntrada(entrada);
  const area = dadosBioforge.areas[usuario.area];
  const tom = dadosBioforge.tons[usuario.tom];
  const indice = indiceDaSemente(semente);
  const headlineArea = selecionar(area.headline, indice, 0);
  const momentoHeadline = dadosBioforge.momentos[usuario.momento];
  const objetivoHeadline = dadosBioforge.objetivos[usuario.objetivo];
  const habilidades = usuario.habilidades.join(" · ");
  const modelo = selecionar(tom.headline, indice, 1);
  const texto = preencher(modelo, {
    areaHeadline: headlineArea,
    momentoHeadline,
    objetivoHeadline,
    habilidades,
  });

  return limitarTexto(
    texto.replace(/\s*\|\s*(?=\||$)/g, "").replace(/\s+/g, " "),
    limites.headline,
  );
}

/**
 * Gera o texto Sobre com campos opcionais omitidos quando estão vazios.
 * @param {object} entrada Campos do formulário ou entrada já normalizada.
 * @param {number|string} [semente=0] Semente reproduzível para escolher variações.
 * @returns {string} Texto Sobre pronto para copiar.
 */
function gerarSobre(entrada, semente = 0) {
  const usuario = normalizarEntrada(entrada);
  const area = dadosBioforge.areas[usuario.area];
  const tom = dadosBioforge.tons[usuario.tom];
  const indice = indiceDaSemente(semente);
  const palavraChave = selecionar(area.palavraChave, indice, 0);
  const valoresArea = { area: usuario.area, palavraChave };
  const aberturaArea = preencher(
    selecionar(area.abertura, indice, 1),
    valoresArea,
  );
  const areaCorpo = selecionar(area.corpo, indice, 2);
  const acao = `${selecionar(area.verbos, indice, 0)} ${selecionar(area.objetos, indice, 0)}`;
  const areaHabilidades = selecionar(area.habilidades, indice, 1);
  const areaFechamento = selecionar(area.fechamento, indice, 2);
  const objetivo = dadosBioforge.objetivos[usuario.objetivo];
  const carreira = {
    "Estudante buscando estágio":
      "Estou estudando e buscando uma oportunidade de estágio.",
    Estagiário: "Atuo como estagiário(a) e sigo ampliando minha prática.",
    "Recém-formado(a)":
      "Concluí minha formação recentemente e estou iniciando minha carreira.",
    "Profissional em transição":
      "Estou em transição profissional e direciono meu próximo passo.",
    "Profissional experiente":
      "Sou profissional experiente e busco novos contextos de atuação.",
  }[usuario.momento];

  const blocos = [];
  if (usuario.nome) {
    const apresentacao =
      usuario.tom === "Próximo e descontraído"
        ? `Oi, sou ${usuario.nome}.`
        : usuario.tom === "Direto e objetivo"
          ? `Sou ${usuario.nome}.`
          : `Meu nome é ${usuario.nome}.`;
    blocos.push(apresentacao);
  }

  blocos.push(
    preencher(selecionar(tom.abertura, indice, 0), {
      area: usuario.area,
      areaAbertura: aberturaArea,
      objetivo,
    }),
  );
  blocos.push(
    preencher(selecionar(tom.corpo, indice, 1), {
      carreira,
      acao,
      areaCorpo,
    }),
  );

  if (usuario.formacao) adicionarFormacao(blocos, usuario.formacao);
  if (usuario.cidade) adicionarCidade(blocos, usuario.cidade);

  if (usuario.habilidades.length) {
    adicionarBlocoHabilidades(
      blocos,
      tom,
      areaHabilidades,
      usuario.habilidades,
      indice,
    );
  }

  blocos.push(
    preencher(selecionar(tom.fechamento, indice, 2), { areaFechamento }),
  );
  return limitarTexto(blocos.join("\n\n"), limites.sobre);
}

/**
 * Acrescenta a formação somente quando o usuário informou esse dado.
 * @param {string[]} blocos Parágrafos da bio em construção.
 * @param {string} formacao Formação ou curso informado.
 * @returns {void}
 */
function adicionarFormacao(blocos, formacao) {
  blocos.push(`Minha formação inclui ${formacao}.`);
}

/**
 * Acrescenta a cidade somente quando o usuário informou esse dado.
 * @param {string[]} blocos Parágrafos da bio em construção.
 * @param {string} cidade Cidade informada.
 * @returns {void}
 */
function adicionarCidade(blocos, cidade) {
  blocos.push(`Estou em ${cidade}.`);
}

/**
 * Acrescenta as habilidades em uma frase adequada ao tom selecionado.
 * @param {string[]} blocos Parágrafos da bio em construção.
 * @param {object} tom Modelos para o tom escolhido.
 * @param {string} areaHabilidades Contexto profissional da área.
 * @param {string[]} habilidades Habilidades informadas.
 * @param {number} indice Índice derivado da semente.
 * @returns {void}
 */
function adicionarBlocoHabilidades(
  blocos,
  tom,
  areaHabilidades,
  habilidades,
  indice,
) {
  blocos.push(
    preencher(selecionar(tom.habilidades, indice, 2), {
      habilidades: habilidades.join(", "),
      areaHabilidades,
    }),
  );
}

/**
 * Gera uma apresentação compacta de até 300 caracteres.
 * @param {object} entrada Campos do formulário ou entrada já normalizada.
 * @param {number|string} [semente=0] Semente reproduzível para escolher variações.
 * @returns {string} Versão curta pronta para copiar.
 */
function gerarVersaoCurta(entrada, semente = 0) {
  const headline = gerarHeadline(entrada, semente);
  const sobre = gerarSobre(entrada, semente);
  const primeiraFrase = sobre.split(/(?<=[.!?])\s|\n/u)[0] || "";
  return limitarTexto(
    [headline, primeiraFrase].filter(Boolean).join(" | "),
    limites.curta,
  );
}

/**
 * Gera os três textos e suas contagens de caracteres em uma única chamada.
 * @param {object} entrada Campos do formulário.
 * @param {number|string} [semente=0] Semente reproduzível para escolher variações.
 * @returns {{headline: string, sobre: string, curta: string, contagens: {headline: number, sobre: number, curta: number}}} Resultado da geração.
 */
function gerarBio(entrada, semente = 0) {
  const headline = gerarHeadline(entrada, semente);
  const sobre = gerarSobre(entrada, semente);
  const curta = gerarVersaoCurta(entrada, semente);

  return {
    headline,
    sobre,
    curta,
    contagens: {
      headline: headline.length,
      sobre: sobre.length,
      curta: curta.length,
    },
  };
}

const apiGerador = {
  normalizarEntrada,
  gerarHeadline,
  gerarSobre,
  gerarVersaoCurta,
  gerarBio,
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = apiGerador;
} else {
  globalThis.BioforgeGenerator = apiGerador;
}
