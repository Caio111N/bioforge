/**
 * bioforge/app.js - interface, etiquetas, prévia, contadores e cópia.
 */
(function iniciarBioforge() {
  const formulario = document.querySelector("#bio-form");
  const seletorArea = document.querySelector("#area-picker");
  const botaoArea = document.querySelector("#area-button");
  const textoArea = document.querySelector("#area-value-label");
  const listaAreas = document.querySelector("#area-listbox");
  const entradaHabilidade = document.querySelector("#habilidade-input");
  const listaHabilidades = document.querySelector("#skill-list");
  const contadorHabilidades = document.querySelector("#skill-count");
  const statusHabilidades = document.querySelector("#skill-status");
  const statusCopia = document.querySelector("#copy-status");
  const statusLimpeza = document.querySelector("#clear-status");
  const avisoObrigatorios = document.querySelector("#required-feedback");
  const seloExemplo = document.querySelector("#example-badge");
  const conteudoResultados = document.querySelector("#results");
  const textoSobrePerfil = document.querySelector("#profile-about");
  const botaoVerMais = document.querySelector("#about-toggle");
  const habilidades = [];
  const limites = { headline: 220, sobre: 2600, curta: 300 };
  const entradaExemplo = {
    area: "Tecnologia da Informação",
    momento: "Estudante buscando estágio",
    nome: "Camila Ribeiro",
    habilidades: ["JavaScript", "SQL", "Git"],
    objetivo: "Conseguir um estágio ou primeira vaga",
    tom: "Profissional",
    formacao: "",
    cidade: "",
  };
  let semente = 0;
  let sobreExpandido = false;
  let quadroAnimacao;
  let temporizadorCopia;
  let indiceAreaAtiva = 0;
  let textoBuscaArea = "";
  let temporizadorBuscaArea;

  /**
   * Cria opções de área com os dados locais e sem depender do menu nativo.
   * @returns {void}
   */
  function renderizarAreas() {
    globalThis.BioforgeData.opcoes.areas.forEach((area, indice) => {
      const opcao = document.createElement("button");
      opcao.className = "area-option";
      opcao.id = `area-option-${indice}`;
      opcao.type = "button";
      opcao.setAttribute("role", "option");
      opcao.setAttribute("aria-selected", "false");
      opcao.setAttribute("tabindex", "-1");
      opcao.dataset.value = area;
      opcao.textContent = area;
      opcao.addEventListener("pointerenter", () => definirAreaAtiva(indice));
      opcao.addEventListener("click", () => selecionarArea(area));
      listaAreas.append(opcao);
    });
  }

  /**
   * Define a opção anunciada pelo combobox sem tirar o foco do gatilho.
   * @param {number} indice Índice da opção ativa.
   * @returns {void}
   */
  function definirAreaAtiva(indice) {
    const opcoes = [...listaAreas.querySelectorAll('[role="option"]')];
    if (!opcoes.length) return;
    indiceAreaAtiva = (indice + opcoes.length) % opcoes.length;
    opcoes.forEach((opcao, posicao) => {
      opcao.classList.toggle("is-active", posicao === indiceAreaAtiva);
    });
    botaoArea.setAttribute("aria-activedescendant", opcoes[indiceAreaAtiva].id);
    opcoes[indiceAreaAtiva].scrollIntoView({ block: "nearest" });
  }

  /**
   * Abre a lista próxima ao valor atual e anuncia o estado expandido.
   * @returns {void}
   */
  function abrirListaArea() {
    listaAreas.hidden = false;
    botaoArea.setAttribute("aria-expanded", "true");
    const selecionada = [
      ...listaAreas.querySelectorAll('[role="option"]'),
    ].findIndex(
      (opcao) => opcao.dataset.value === formulario.elements.area.value,
    );
    definirAreaAtiva(selecionada < 0 ? 0 : selecionada);
  }

  /**
   * Fecha a lista e limpa a referência de navegação acessível.
   * @returns {void}
   */
  function fecharListaArea() {
    listaAreas.hidden = true;
    botaoArea.setAttribute("aria-expanded", "false");
    botaoArea.removeAttribute("aria-activedescendant");
  }

  /**
   * Seleciona uma área e atualiza o resultado sem submeter o formulário.
   * @param {string} area Valor integral da opção escolhida.
   * @returns {void}
   */
  function selecionarArea(area) {
    formulario.elements.area.value = area;
    textoArea.textContent = area;
    listaAreas.querySelectorAll('[role="option"]').forEach((opcao) => {
      opcao.setAttribute("aria-selected", String(opcao.dataset.value === area));
    });
    fecharListaArea();
    atualizarBio();
    botaoArea.focus();
  }

  /**
   * Busca uma área pelo início do nome, ignorando acentos e caixa.
   * @param {string} caractere Letra digitada durante a navegação.
   * @returns {void}
   */
  function buscarArea(caractere) {
    textoBuscaArea += caractere
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
    window.clearTimeout(temporizadorBuscaArea);
    temporizadorBuscaArea = window.setTimeout(() => {
      textoBuscaArea = "";
    }, 700);
    if (listaAreas.hidden) abrirListaArea();
    const opcoes = [...listaAreas.querySelectorAll('[role="option"]')];
    const indice = opcoes.findIndex((opcao) =>
      opcao.textContent
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .startsWith(textoBuscaArea),
    );
    if (indice >= 0) definirAreaAtiva(indice);
  }

  /**
   * Trata teclado de combobox: setas, início/fim, seleção, escape e busca.
   * @param {KeyboardEvent} evento Tecla pressionada no gatilho.
   * @returns {void}
   */
  function navegarAreas(evento) {
    const opcoes = listaAreas.querySelectorAll('[role="option"]');
    if (evento.key === "Tab") {
      fecharListaArea();
      return;
    }
    if (evento.key === "Escape" && !listaAreas.hidden) {
      evento.preventDefault();
      fecharListaArea();
      return;
    }
    if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
      evento.preventDefault();
      if (listaAreas.hidden) abrirListaArea();
      else
        definirAreaAtiva(
          indiceAreaAtiva + (evento.key === "ArrowDown" ? 1 : -1),
        );
      return;
    }
    if (evento.key === "Home" || evento.key === "End") {
      evento.preventDefault();
      if (listaAreas.hidden) abrirListaArea();
      definirAreaAtiva(evento.key === "Home" ? 0 : opcoes.length - 1);
      return;
    }
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      if (listaAreas.hidden) abrirListaArea();
      else selecionarArea(opcoes[indiceAreaAtiva].dataset.value);
      return;
    }
    if (
      evento.key.length === 1 &&
      !evento.altKey &&
      !evento.ctrlKey &&
      !evento.metaKey
    ) {
      buscarArea(evento.key);
    }
  }

  /**
   * Lê os campos nativos e as habilidades já confirmadas como etiquetas.
   * @returns {object} Dados atuais do formulário.
   */
  function lerFormulario() {
    return {
      area: formulario.elements.area.value,
      momento: formulario.elements.momento.value,
      nome: formulario.elements.nome.value,
      habilidades: [...habilidades],
      objetivo: formulario.elements.objetivo.value,
      tom: formulario.elements.tom.value,
      formacao: formulario.elements.formacao.value,
      cidade: formulario.elements.cidade.value,
    };
  }

  /**
   * Retorna os campos obrigatórios ainda sem escolha.
   * @param {object} entrada Dados atuais do formulário.
   * @returns {string[]} Rótulos que faltam.
   */
  function camposPendentes(entrada) {
    const pendentes = [];
    if (!entrada.area) pendentes.push("Área");
    if (!entrada.momento) pendentes.push("Momento de carreira");
    if (!entrada.objetivo) pendentes.push("Objetivo");
    if (!entrada.tom) pendentes.push("Tom de voz");
    return pendentes;
  }

  /**
   * Atualiza o número, a barra acessível e o aviso de proximidade do limite.
   * @param {string} chave Identificador do texto gerado.
   * @param {string} texto Conteúdo exibido no cartão.
   * @returns {void}
   */
  function atualizarContador(chave, texto) {
    const limite = limites[chave];
    const percentual = Math.min(100, (texto.length / limite) * 100);
    const contador = document.querySelector(`#${chave}-count`);
    const barra = document.querySelector(`#${chave}-meter`);
    const progresso = document.querySelector(`#${chave}-progress`);
    contador.textContent = `${texto.length.toLocaleString("pt-BR")} / ${limite.toLocaleString("pt-BR")}`;
    contador.classList.toggle("near-limit", percentual >= 85);
    barra.style.width = `${percentual}%`;
    progresso.setAttribute("aria-valuenow", String(texto.length));
    progresso.classList.toggle("near-limit", percentual >= 85);
  }

  /**
   * Mostra uma transição breve sem recriar os elementos que recebem foco.
   * @returns {void}
   */
  function animarAtualizacao() {
    conteudoResultados.classList.add("is-updating");
    window.cancelAnimationFrame(quadroAnimacao);
    quadroAnimacao = window.requestAnimationFrame(() => {
      conteudoResultados.classList.remove("is-updating");
    });
  }

  /**
   * Atualiza a prévia do perfil, o estado de demonstração e os três textos.
   * @returns {void}
   */
  function atualizarBio() {
    const entrada = lerFormulario();
    const temDados = Boolean(
      entrada.area ||
      entrada.momento ||
      entrada.nome ||
      entrada.habilidades.length ||
      entrada.objetivo ||
      entrada.tom ||
      entrada.formacao ||
      entrada.cidade,
    );
    const ehExemplo = !temDados;
    const pendentes = camposPendentes(entrada);
    const completa = pendentes.length === 0;
    const bio = globalThis.BioforgeGenerator.gerarBio(
      ehExemplo ? entradaExemplo : entrada,
      semente,
    );
    const nomePerfil =
      entrada.nome.trim() || (ehExemplo ? "Camila Ribeiro" : "Seu nome");

    animarAtualizacao();
    textoArea.textContent = entrada.area || "Selecione sua área";
    listaAreas.querySelectorAll('[role="option"]').forEach((opcao) => {
      opcao.setAttribute(
        "aria-selected",
        String(opcao.dataset.value === entrada.area),
      );
    });
    document.querySelector("#profile-name").textContent = nomePerfil;
    document.querySelector("#profile-avatar").textContent =
      obterIniciais(nomePerfil);
    document.querySelector("#profile-headline").textContent = bio.headline;
    textoSobrePerfil.textContent = bio.sobre;
    sobreExpandido = false;
    textoSobrePerfil.classList.remove("expanded");
    botaoVerMais.textContent = "ver mais";
    botaoVerMais.setAttribute("aria-expanded", "false");

    atualizarTexto("headline", bio.headline);
    atualizarTexto("sobre", bio.sobre);
    atualizarTexto("curta", bio.curta);
    atualizarContador("headline", bio.headline);
    atualizarContador("sobre", bio.sobre);
    atualizarContador("curta", bio.curta);

    seloExemplo.hidden = completa;
    seloExemplo.textContent = ehExemplo ? "Exemplo" : "Prévia parcial";
    avisoObrigatorios.hidden = completa || ehExemplo;
    avisoObrigatorios.textContent =
      completa || ehExemplo
        ? ""
        : `Selecione ${pendentes.join(", ")} para personalizar a prévia.`;
    document.querySelector("#area-help").hidden = Boolean(entrada.area);
    document.querySelector("#career-help").hidden = Boolean(entrada.momento);
    document.querySelector("#goal-help").hidden = Boolean(entrada.objetivo);
    document.querySelector("#tone-help").hidden = Boolean(entrada.tom);
  }

  /**
   * Atualiza o texto de um cartão sem substituir seu nó no documento.
   * @param {string} chave Identificador do resultado.
   * @param {string} texto Texto novo.
   * @returns {void}
   */
  function atualizarTexto(chave, texto) {
    document.querySelector(`#${chave}-output`).textContent = texto;
  }

  /**
   * Calcula iniciais legíveis para o avatar da prévia.
   * @param {string} nome Nome que aparece no perfil.
   * @returns {string} Uma ou duas iniciais.
   */
  function obterIniciais(nome) {
    const partes = nome.trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return "BF";
    return partes
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toLocaleUpperCase("pt-BR");
  }

  /**
   * Desenha etiquetas seguras como texto e oferece remoção por teclado.
   * @returns {void}
   */
  function renderizarHabilidades() {
    listaHabilidades.replaceChildren();
    habilidades.forEach((habilidade, indice) => {
      const item = document.createElement("li");
      const texto = document.createElement("span");
      const remover = document.createElement("button");
      item.className = "skill-tag";
      texto.textContent = habilidade;
      remover.className = "skill-remove";
      remover.type = "button";
      remover.setAttribute("aria-label", `Remover habilidade ${habilidade}`);
      remover.textContent = "×";
      remover.addEventListener("click", () => {
        habilidades.splice(indice, 1);
        statusHabilidades.textContent = "";
        renderizarHabilidades();
        atualizarBio();
        entradaHabilidade.focus();
      });
      item.append(texto, remover);
      listaHabilidades.append(item);
    });
    contadorHabilidades.textContent = `${habilidades.length} de 8`;
  }

  /**
   * Adiciona itens únicos, sem exceder oito etiquetas.
   * @param {string} texto Conteúdo digitado ou colado no campo.
   * @returns {void}
   */
  function adicionarHabilidades(texto) {
    const itens = texto
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
    let excedeuLimite = false;
    for (const item of itens) {
      const repetida = habilidades.some(
        (existente) =>
          existente.toLocaleLowerCase("pt-BR") ===
          item.toLocaleLowerCase("pt-BR"),
      );
      if (repetida) continue;
      if (habilidades.length >= 8) {
        excedeuLimite = true;
        continue;
      }
      habilidades.push(item.replace(/\s+/g, " "));
    }
    statusHabilidades.textContent = excedeuLimite
      ? "Limite de 8 habilidades."
      : "";
    renderizarHabilidades();
    atualizarBio();
  }

  /**
   * Usa a API nativa e mantém uma alternativa para páginas abertas como arquivo.
   * @param {string} texto Conteúdo que será copiado.
   * @returns {Promise<void>} Conclusão da cópia.
   */
  async function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return;
    }
    const temporario = document.createElement("textarea");
    temporario.value = texto;
    temporario.setAttribute("readonly", "");
    temporario.style.position = "fixed";
    temporario.style.opacity = "0";
    document.body.append(temporario);
    temporario.select();
    const copiou = document.execCommand("copy");
    temporario.remove();
    if (!copiou) throw new Error("A cópia não foi autorizada pelo navegador.");
  }

  /**
   * Exibe o estado Copiado com ícone e restaura o botão após uma pausa curta.
   * @param {HTMLButtonElement} botao Botão que iniciou a cópia.
   * @returns {void}
   */
  function confirmarCopia(botao) {
    restaurarBotoesDeCopia();
    botao.classList.add("is-copied");
    botao.querySelector(".copy-label").textContent = "Copiado!";
    botao.querySelector(".copy-check").hidden = false;
    statusCopia.textContent = "Texto copiado.";
    window.clearTimeout(temporizadorCopia);
    temporizadorCopia = window.setTimeout(() => {
      restaurarBotoesDeCopia();
      statusCopia.textContent = "";
    }, 1800);
  }

  /**
   * Restaura os rótulos dos botões após a confirmação temporária.
   * @returns {void}
   */
  function restaurarBotoesDeCopia() {
    document
      .querySelectorAll(".copy-button, [data-copy-bio]")
      .forEach((botao) => {
        botao.classList.remove("is-copied");
        botao.querySelector(".copy-label").textContent = botao.hasAttribute(
          "data-copy-bio",
        )
          ? "Copiar bio"
          : "Copiar";
        botao.querySelector(".copy-check").hidden = true;
      });
  }

  /**
   * Anima brevemente o botão ao escolher outra variação.
   * @param {HTMLButtonElement} botao Controle que foi acionado.
   * @returns {void}
   */
  function animarForja(botao) {
    botao.classList.remove("is-forging");
    void botao.offsetWidth;
    botao.classList.add("is-forging");
    window.setTimeout(() => botao.classList.remove("is-forging"), 460);
  }

  formulario.addEventListener("input", (evento) => {
    if (evento.target.matches("input[type='text']")) atualizarBio();
  });
  formulario.addEventListener("change", (evento) => {
    if (evento.target.matches("select, input[type='radio']")) atualizarBio();
  });

  botaoArea.addEventListener("click", () => {
    if (listaAreas.hidden) abrirListaArea();
    else fecharListaArea();
  });
  botaoArea.addEventListener("keydown", navegarAreas);
  document.addEventListener("pointerdown", (evento) => {
    if (!seletorArea.contains(evento.target)) fecharListaArea();
  });

  entradaHabilidade.addEventListener("keydown", (evento) => {
    if (evento.isComposing) return;
    if (evento.key === "Enter" || evento.key === ",") {
      evento.preventDefault();
      if (entradaHabilidade.value.trim())
        adicionarHabilidades(entradaHabilidade.value);
      entradaHabilidade.value = "";
    } else if (
      evento.key === "Backspace" &&
      !entradaHabilidade.value &&
      habilidades.length
    ) {
      habilidades.pop();
      statusHabilidades.textContent = "";
      renderizarHabilidades();
      atualizarBio();
    }
  });

  entradaHabilidade.addEventListener("input", () => {
    if (!entradaHabilidade.value.includes(",")) return;
    const partes = entradaHabilidade.value.split(",");
    entradaHabilidade.value = partes.pop().trimStart();
    adicionarHabilidades(partes.join(","));
  });

  botaoVerMais.addEventListener("click", () => {
    sobreExpandido = !sobreExpandido;
    textoSobrePerfil.classList.toggle("expanded", sobreExpandido);
    botaoVerMais.textContent = sobreExpandido ? "ver menos" : "ver mais";
    botaoVerMais.setAttribute("aria-expanded", String(sobreExpandido));
  });

  document.querySelectorAll("[data-action='regenerate']").forEach((botao) => {
    botao.addEventListener("click", () => {
      semente += 1;
      atualizarBio();
      animarForja(botao);
    });
  });

  document.querySelectorAll(".copy-button").forEach((botao) => {
    botao.addEventListener("click", async () => {
      const chave = botao.dataset.copy;
      const texto = document.querySelector(`#${chave}-output`).textContent;
      try {
        await copiarTexto(texto);
        confirmarCopia(botao);
      } catch {
        statusCopia.textContent = "Não foi possível copiar neste navegador.";
      }
    });
  });

  document
    .querySelector("[data-copy-bio]")
    .addEventListener("click", async (evento) => {
      const botao = evento.currentTarget;
      const headline = document.querySelector("#headline-output").textContent;
      const sobre = document.querySelector("#sobre-output").textContent;
      try {
        await copiarTexto(`${headline}\n\n${sobre}`);
        confirmarCopia(botao);
      } catch {
        statusCopia.textContent = "Não foi possível copiar neste navegador.";
      }
    });

  document.querySelector("#clear-button").addEventListener("click", () => {
    formulario.reset();
    formulario.elements.area.value = "";
    habilidades.splice(0, habilidades.length);
    entradaHabilidade.value = "";
    statusHabilidades.textContent = "";
    statusLimpeza.textContent = "Campos limpos; o exemplo voltou.";
    statusCopia.textContent = "";
    window.clearTimeout(temporizadorCopia);
    restaurarBotoesDeCopia();
    semente = 0;
    renderizarHabilidades();
    atualizarBio();
    botaoArea.focus();
  });

  renderizarAreas();
  renderizarHabilidades();
  atualizarBio();
})();
