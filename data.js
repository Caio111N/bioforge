/**
 * bioforge/data.js - modelos de texto e vocabulário local por área e tom.
 * Mantém os dados compartilhados entre o navegador e os testes do Node.js.
 */
(function disponibilizarDados(escopo) {
  const opcoes = {
    areas: [
      "Tecnologia da Informação",
      "Desenvolvimento de Software",
      "Dados",
      "Administração",
      "Marketing",
      "Direito",
      "Engenharia",
      "Saúde",
      "Design",
    ],
    momentos: [
      "Estudante buscando estágio",
      "Estagiário",
      "Recém-formado(a)",
      "Profissional em transição",
      "Profissional experiente",
    ],
    objetivos: [
      "Conseguir um estágio ou primeira vaga",
      "Mudar de área",
      "Fazer networking",
      "Atrair clientes ou projetos",
    ],
    tons: ["Profissional", "Próximo e descontraído", "Direto e objetivo"],
  };

  const areas = {
    "Tecnologia da Informação": {
      palavraChave: [
        "suporte técnico",
        "infraestrutura",
        "segurança da informação",
      ],
      verbos: ["apoiar", "organizar", "documentar"],
      objetos: [
        "pessoas no uso da tecnologia",
        "ambientes e serviços de TI",
        "soluções técnicas",
      ],
      headline: [
        "suporte e serviços de TI",
        "infraestrutura e sistemas",
        "tecnologia e segurança da informação",
      ],
      abertura: [
        "suporte, infraestrutura e {palavraChave}",
        "serviços de TI com atenção a {palavraChave}",
        "soluções digitais relacionadas a {palavraChave}",
      ],
      corpo: [
        "rotinas de suporte e organização de serviços",
        "infraestrutura, acessos e documentação técnica",
        "segurança, disponibilidade e atendimento",
      ],
      habilidades: [
        "suporte e organização de ambientes de TI",
        "infraestrutura e documentação de serviços",
        "segurança e atendimento a usuários",
      ],
      fechamento: [
        "qualidade no suporte e nos serviços de TI",
        "ambientes digitais organizados e seguros",
        "acesso claro e confiável à tecnologia",
      ],
    },
    "Desenvolvimento de Software": {
      palavraChave: [
        "desenvolvimento web",
        "qualidade de código",
        "integração de sistemas",
      ],
      verbos: ["desenvolver", "integrar", "documentar"],
      objetos: [
        "soluções digitais",
        "sistemas e serviços",
        "decisões técnicas",
      ],
      headline: [
        "desenvolvimento de software",
        "software e soluções digitais",
        "código, sistemas e integrações",
      ],
      abertura: [
        "criação de software com foco em {palavraChave}",
        "soluções digitais e práticas de {palavraChave}",
        "produtos de software ligados a {palavraChave}",
      ],
      corpo: [
        "estruturação e manutenção de aplicações",
        "lógica, testes e evolução de software",
        "interfaces, serviços e integração de sistemas",
      ],
      habilidades: [
        "desenvolvimento e manutenção de aplicações",
        "testes, lógica e qualidade de código",
        "interfaces e integração entre sistemas",
      ],
      fechamento: [
        "software claro, útil e bem estruturado",
        "soluções digitais cuidadosas e acessíveis",
        "qualidade e evolução contínua de sistemas",
      ],
    },
    Dados: {
      palavraChave: ["análise de dados", "SQL", "visualização de informações"],
      verbos: ["analisar", "organizar", "comunicar"],
      objetos: [
        "informações com contexto",
        "bases de dados",
        "conclusões com clareza",
      ],
      headline: [
        "análise e visualização de dados",
        "dados e SQL",
        "informação para decisões",
      ],
      abertura: [
        "análise de informações com foco em {palavraChave}",
        "dados organizados e práticas de {palavraChave}",
        "investigação de dados ligada a {palavraChave}",
      ],
      corpo: [
        "consulta, organização e interpretação de informações",
        "qualidade de dados e leitura de contextos",
        "análises e comunicação de descobertas",
      ],
      habilidades: [
        "consulta e organização de bases de dados",
        "análise e visualização de informações",
        "qualidade e comunicação de dados",
      ],
      fechamento: [
        "informações bem organizadas e compreensíveis",
        "análises cuidadosas e decisões informadas",
        "dados apresentados com contexto e clareza",
      ],
    },
    Administração: {
      palavraChave: [
        "organização de processos",
        "planejamento",
        "rotinas administrativas",
      ],
      verbos: ["organizar", "planejar", "acompanhar"],
      objetos: [
        "processos e informações",
        "atividades e prioridades",
        "rotinas com atenção",
      ],
      headline: [
        "administração e processos",
        "planejamento e rotinas administrativas",
        "organização e gestão de atividades",
      ],
      abertura: [
        "organização administrativa com foco em {palavraChave}",
        "processos de trabalho ligados a {palavraChave}",
        "planejamento e rotinas com atenção a {palavraChave}",
      ],
      corpo: [
        "organização de tarefas, documentos e informações",
        "planejamento e acompanhamento de processos",
        "rotinas administrativas e comunicação entre equipes",
      ],
      habilidades: [
        "organização de processos e informações",
        "planejamento e acompanhamento de rotinas",
        "comunicação e gestão de tarefas",
      ],
      fechamento: [
        "processos claros e rotinas bem organizadas",
        "planejamento atento às prioridades da equipe",
        "informações acessíveis para apoiar o trabalho",
      ],
    },
    Marketing: {
      palavraChave: [
        "estratégia de conteúdo",
        "comunicação digital",
        "pesquisa de público",
      ],
      verbos: ["planejar", "criar", "analisar"],
      objetos: [
        "conteúdos relevantes",
        "comunicações digitais",
        "necessidades de público",
      ],
      headline: [
        "marketing e conteúdo",
        "comunicação e estratégia digital",
        "conteúdo e pesquisa de público",
      ],
      abertura: [
        "comunicação de marcas com foco em {palavraChave}",
        "estratégias de marketing ligadas a {palavraChave}",
        "conteúdo e pesquisa voltados a {palavraChave}",
      ],
      corpo: [
        "planejamento de conteúdo e comunicação de marca",
        "pesquisa de público e construção de mensagens",
        "canais digitais, conteúdo e estratégia",
      ],
      habilidades: [
        "planejamento e criação de conteúdo",
        "comunicação digital e pesquisa de público",
        "estratégia de marca e produção de mensagens",
      ],
      fechamento: [
        "comunicação relevante e alinhada ao público",
        "conteúdo claro e estratégias bem planejadas",
        "marcas e pessoas conectadas por boas mensagens",
      ],
    },
    Direito: {
      palavraChave: [
        "pesquisa jurídica",
        "análise documental",
        "direito civil",
      ],
      verbos: ["pesquisar", "analisar", "organizar"],
      objetos: [
        "fontes jurídicas com cuidado",
        "documentos e informações",
        "rotinas jurídicas",
      ],
      headline: [
        "pesquisa e análise jurídica",
        "direito e análise documental",
        "estudo jurídico e organização de informações",
      ],
      abertura: [
        "estudo jurídico com atenção a {palavraChave}",
        "rotinas do Direito relacionadas a {palavraChave}",
        "pesquisa e análise jurídica voltadas a {palavraChave}",
      ],
      corpo: [
        "pesquisa de legislação e organização de documentos",
        "leitura cuidadosa de informações e fontes jurídicas",
        "análise documental e comunicação objetiva",
      ],
      habilidades: [
        "pesquisa jurídica e organização de documentos",
        "leitura e análise de informações jurídicas",
        "comunicação escrita e atenção a detalhes",
      ],
      fechamento: [
        "informações jurídicas organizadas com cuidado",
        "pesquisa e comunicação claras e responsáveis",
        "análise atenta de documentos e contextos",
      ],
    },
    Engenharia: {
      palavraChave: ["projetos técnicos", "processos", "segurança operacional"],
      verbos: ["planejar", "analisar", "acompanhar"],
      objetos: [
        "projetos técnicos",
        "processos e requisitos",
        "atividades com segurança",
      ],
      headline: [
        "engenharia e projetos técnicos",
        "processos e análise de projetos",
        "planejamento e segurança operacional",
      ],
      abertura: [
        "projetos de engenharia com foco em {palavraChave}",
        "análise técnica e práticas de {palavraChave}",
        "processos de engenharia ligados a {palavraChave}",
      ],
      corpo: [
        "leitura de requisitos e planejamento de projetos",
        "análise de processos e documentação técnica",
        "organização de etapas, recursos e informações",
      ],
      habilidades: [
        "planejamento e análise de projetos técnicos",
        "processos, requisitos e documentação",
        "organização de atividades e segurança operacional",
      ],
      fechamento: [
        "projetos tecnicamente consistentes e bem planejados",
        "processos seguros, claros e eficientes",
        "soluções de engenharia pensadas com responsabilidade",
      ],
    },
    Saúde: {
      palavraChave: [
        "cuidado integral",
        "promoção da saúde",
        "atenção humanizada",
      ],
      verbos: ["estudar", "compreender", "apoiar"],
      objetos: [
        "práticas de cuidado",
        "necessidades de saúde",
        "ações de promoção da saúde",
      ],
      headline: [
        "saúde e cuidado integral",
        "promoção e atenção à saúde",
        "cuidado e comunicação em saúde",
      ],
      abertura: [
        "cuidado em saúde com atenção a {palavraChave}",
        "práticas de saúde relacionadas a {palavraChave}",
        "promoção do cuidado com foco em {palavraChave}",
      ],
      corpo: [
        "comunicação cuidadosa e atenção às pessoas",
        "promoção da saúde e orientação responsável",
        "organização de informações e práticas de cuidado",
      ],
      habilidades: [
        "comunicação e organização de informações em saúde",
        "promoção do cuidado e atenção às pessoas",
        "orientação responsável e trabalho colaborativo",
      ],
      fechamento: [
        "cuidado respeitoso e comunicação acolhedora",
        "informações de saúde claras e acessíveis",
        "práticas responsáveis e atenção às pessoas",
      ],
    },
    Design: {
      palavraChave: [
        "design de interfaces",
        "pesquisa com usuários",
        "sistemas visuais",
      ],
      verbos: ["criar", "prototipar", "organizar"],
      objetos: [
        "interfaces claras",
        "ideias em soluções visuais",
        "sistemas e componentes",
      ],
      headline: [
        "design e interfaces",
        "experiência e pesquisa com usuários",
        "sistemas visuais e prototipação",
      ],
      abertura: [
        "soluções de design com foco em {palavraChave}",
        "experiências digitais ligadas a {palavraChave}",
        "comunicação visual e práticas de {palavraChave}",
      ],
      corpo: [
        "pesquisa, estruturação e prototipação de interfaces",
        "hierarquia visual e sistemas de componentes",
        "necessidades de usuários e comunicação visual",
      ],
      habilidades: [
        "pesquisa e prototipação de interfaces",
        "sistemas visuais e organização de componentes",
        "experiência de uso e comunicação visual",
      ],
      fechamento: [
        "experiências digitais claras e acessíveis",
        "soluções visuais coerentes com as necessidades das pessoas",
        "interfaces úteis, consistentes e bem estruturadas",
      ],
    },
  };

  const tons = {
    Profissional: {
      headline: [
        "{areaHeadline} | {momentoHeadline} | {habilidades}",
        "{areaHeadline} | Em busca de {objetivoHeadline} | {habilidades}",
        "{areaHeadline} | {momentoHeadline}",
      ],
      abertura: [
        "Minha atuação em {area} se concentra em {areaAbertura}; neste momento, meu objetivo é {objetivo}.",
        "Direciono minha trajetória em {area} para {areaAbertura} e busco {objetivo}.",
        "Tenho interesse em {areaAbertura} na área de {area}, com o objetivo de {objetivo}.",
      ],
      corpo: [
        "{carreira} Tenho interesse em {acao}, com atenção a {areaCorpo}.",
        "{carreira} Quero {acao}, com atenção a {areaCorpo}.",
        "{carreira} Valorizo uma atuação cuidadosa em atividades de {areaCorpo}, como {acao}.",
      ],
      habilidades: [
        "Minhas habilidades incluem {habilidades}; quero relacioná-las a atividades de {areaHabilidades}.",
        "Trago conhecimentos em {habilidades} e interesse em atividades de {areaHabilidades}.",
        "Entre minhas habilidades estão {habilidades}, relevantes para {areaHabilidades}.",
      ],
      fechamento: [
        "Busco oportunidades para contribuir com {areaFechamento}.",
        "Tenho interesse em projetos voltados a {areaFechamento}.",
        "Quero desenvolver minha atuação em iniciativas ligadas a {areaFechamento}.",
      ],
    },
    "Próximo e descontraído": {
      headline: [
        "{areaHeadline} | aprendendo e construindo minha trajetória",
        "{areaHeadline} | {momentoHeadline} | {habilidades}",
        "{areaHeadline} | aberto(a) a {objetivoHeadline}",
      ],
      abertura: [
        "Estou construindo meu caminho em {area}, com curiosidade por {areaAbertura}. Agora, busco {objetivo}.",
        "Quero crescer na área de {area}, explorando {areaAbertura} e buscando {objetivo}.",
        "Meu interesse em {area} passa por {areaAbertura}; neste momento, quero {objetivo}.",
      ],
      corpo: [
        "{carreira} Quero aprender e contribuir com {acao}, valorizando {areaCorpo}.",
        "{carreira} Gosto de trocar ideias e explorar maneiras de {acao}, com atenção a {areaCorpo}.",
        "{carreira} Quero somar ao time e {acao}, cuidando de {areaCorpo}.",
      ],
      habilidades: [
        "Também conto com {habilidades} e quero aprender mais sobre {areaHabilidades}.",
        "Tenho habilidades em {habilidades} e quero colocá-las em prática em {areaHabilidades}.",
        "Trago {habilidades} comigo e quero seguir aprendendo em {areaHabilidades}.",
      ],
      fechamento: [
        "Quero conhecer pessoas e projetos ligados a {areaFechamento}.",
        "Será bom trocar ideias sobre {areaFechamento}.",
        "Espero encontrar boas oportunidades para trabalhar com {areaFechamento}.",
      ],
    },
    "Direto e objetivo": {
      headline: [
        "{areaHeadline} | foco em {objetivoHeadline} | {habilidades}",
        "{areaHeadline} | {momentoHeadline}",
        "{areaHeadline} | {habilidades} | {objetivoHeadline}",
      ],
      abertura: [
        "Meu foco em {area} é {areaAbertura}. Busco {objetivo}.",
        "Atuo em direção a {areaAbertura} na área de {area} e procuro {objetivo}.",
        "Em {area}, direciono meu perfil a {areaAbertura}, com o objetivo de {objetivo}.",
      ],
      corpo: [
        "{carreira} Meu foco está em {areaCorpo} e em {acao}.",
        "{carreira} Quero contribuir com {acao}, com atenção a {areaCorpo}.",
        "{carreira} Busco oportunidades que envolvam {areaCorpo} e {acao}.",
      ],
      habilidades: [
        "Minhas habilidades: {habilidades}. Meu foco de aplicação: {areaHabilidades}.",
        "Posso contribuir com {habilidades} em atividades de {areaHabilidades}.",
        "Tenho conhecimentos em {habilidades}, voltados a {areaHabilidades}.",
      ],
      fechamento: [
        "Tenho interesse em atuar com {areaFechamento}.",
        "Busco oportunidades relacionadas a {areaFechamento}.",
        "Meu próximo passo é contribuir com {areaFechamento}.",
      ],
    },
  };

  const momentos = {
    "Estudante buscando estágio": "estudante em busca de estágio",
    Estagiário: "estagiário(a)",
    "Recém-formado(a)": "recém-formado(a)",
    "Profissional em transição": "profissional em transição",
    "Profissional experiente": "profissional experiente",
  };

  const objetivos = {
    "Conseguir um estágio ou primeira vaga":
      "uma oportunidade de estágio ou primeira vaga",
    "Mudar de área": "uma transição de área",
    "Fazer networking": "novas conexões profissionais",
    "Atrair clientes ou projetos": "novos clientes ou projetos",
  };

  const dados = { opcoes, areas, tons, momentos, objetivos };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = dados;
  } else {
    escopo.BioforgeData = dados;
  }
})(globalThis);
