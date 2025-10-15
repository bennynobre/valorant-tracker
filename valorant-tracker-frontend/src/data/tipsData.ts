export interface AgentTips {
  general: string[];
  comps: {
    mapa: string;
    composicao: string[];
  }[];
}

export const tipsData = new Map<string, AgentTips>([
  [
    'Jett',
    {
      general: [
        'Use o Ímpeto Ascendente (Q) para alcançar posições elevadas e surpreender inimigos.',
        'O Brisa de Impulso (E) é sua principal ferramenta de escape. Use-o para recuar após um abate de Operator ou para entrar agressivamente em um site.',
        'A ultimate, Tormenta de Aço (X), é 100% precisa em movimento. Use-a em eco rounds ou para garantir abates de longa distância.',
      ],
      comps: [
        { mapa: 'Icebox', composicao: ['Jett', 'KAY/O', 'Sova', 'Viper', 'Killjoy'] },
        { mapa: 'Ascent', composicao: ['Jett', 'Omen', 'Sova', 'KAY/O', 'Killjoy'] },
      ],
    },
  ],
  [
    'Neon',
    {
      general: [
        'Use a Via Expressa (E) para entrar rapidamente em bombsites ou para rotacionar de forma segura.',
        'O Salto Elétrico (Q) é ótimo para limpar cantos e forçar inimigos a se reposicionarem antes de você avançar.',
        'A ultimate, Sobrecarga (X), aumenta sua velocidade. Mantenha-se em movimento constante para ser um alvo difícil de acertar.',
      ],
      comps: [
        { mapa: 'Fracture', composicao: ['Neon', 'Breach', 'Brimstone', 'Cypher', 'KAY/O'] },
        { mapa: 'Lotus', composicao: ['Neon', 'Fade', 'Omen', 'Killjoy', 'Viper'] },
      ],
    },
  ],
  [
    'Phoenix',
    {
      general: [
        'Use a Bola Curva (Q) para cegar inimigos ao virar esquinas. Lembre-se de virar o rosto para não se cegar.',
        'A Parede de Fogo (C) pode ser usada para bloquear a visão, curar você e entrar em bombsites.',
        'A ultimate, Renascimento (X), é perfeita para entradas agressivas e buscar informação sem risco de morrer.',
      ],
      comps: [
        { mapa: 'Haven', composicao: ['Phoenix', 'Sova', 'Omen', 'Killjoy', 'Breach'] },
      ],
    },
  ],
  [
    'Raze',
    {
      general: [
        'Use os Cartuchos de Tinta (E) para limpar áreas fechadas e negar posições a inimigos.',
        'O Carga de Explosivos (Q) é sua principal ferramenta de mobilidade. Pratique o "satchel jump" para se mover rapidamente pelo mapa.',
        'A ultimate, Estraga-Prazeres (X), é devastadora em áreas pequenas. Combine com o Bumba (C) para encontrar alvos.',
      ],
      comps: [
        { mapa: 'Bind', composicao: ['Raze', 'Skye', 'Viper', 'Brimstone', 'Fade'] },
        { mapa: 'Split', composicao: ['Raze', 'Omen', 'Skye', 'Cypher', 'Viper'] },
      ],
    },
  ],
  [
    'Reyna',
    {
      general: [
        'Seu poder depende de conseguir o primeiro abate. Jogue de forma agressiva para ativar suas habilidades de cura (Devorar) ou reposicionamento (Dispensar).',
        'O Olhar Voraz (C) é ótimo para iniciar combates, forçando inimigos a quebrar o orbe ou virar o rosto.',
        'A ultimate, Imperatriz (X), aumenta drasticamente sua velocidade de tiro e recarga. Use-a para dominar rounds decisivos.',
      ],
      comps: [
        { mapa: 'Ascent', composicao: ['Reyna', 'Omen', 'Sova', 'KAY/O', 'Killjoy'] },
      ],
    },
  ],
  [
    'Yoru',
    {
      general: [
        'Use o Ponto Cego (Q) para cegar inimigos; ele ativa após quicar em uma superfície, permitindo jogadas criativas.',
        'O Passagem Dimensional (E) é ótimo para se infiltrar atrás das linhas inimigas ou para fugir de situações perigosas.',
        'A ultimate, Espionagem Dimensional (X), permite que você se reposicione com segurança e colete muita informação para seu time.',
      ],
      comps: [
        { mapa: 'Bind', composicao: ['Yoru', 'Brimstone', 'Skye', 'Viper', 'Sova'] },
      ],
    },
  ],
  [
    'Iso',
    {
      general: [
        'Fluxo Protetor (E) é sua principal habilidade para duelos. Lembre-se de que você precisa conseguir um abate para gerar o escudo.',
        'Use Contingência (C) para avançar de forma segura, bloqueando ângulos e forçando inimigos a se moverem.',
        'A ultimate, Contrato de Abate (X), é uma ferramenta poderosa para isolar e garantir um abate em um jogador chave.',
      ],
      comps: [
        { mapa: 'Sunset', composicao: ['Iso', 'Omen', 'Fade', 'Cypher', 'KAY/O'] },
      ],
    },
  ],

  // --- INICIADORES ---
  [
    'Breach',
    {
      general: [
        'Todas as suas habilidades atravessam paredes. Use isso para forçar inimigos a saírem de posições seguras sem se expor.',
        'Combine o Falha Tectônica (E) com o Pós-Choque (C) para garantir dano em inimigos presos em cantos.',
        'A ultimate, Onda Trovejante (X), é uma das melhores ferramentas para iniciar uma invasão de bombsite.',
      ],
      comps: [
        { mapa: 'Haven', composicao: ['Breach', 'Jett', 'Omen', 'Sova', 'Killjoy'] },
      ],
    },
  ],
  [
    'Fade',
    {
      general: [
        'O Assombrar (E) revela a posição dos inimigos e deixa um rastro. Use-o para obter informação antes de entrar em um site.',
        'Use a Clausura (Q) para prender inimigos em uma área, facilitando o uso de outras habilidades de dano.',
        'A ultimate, Véu da Noite (X), ensurdece, decai e rastreia inimigos em uma grande área, sendo perfeita para retakes.',
      ],
      comps: [
        { mapa: 'Lotus', composicao: ['Fade', 'Omen', 'Raze', 'Killjoy', 'Viper'] },
      ],
    },
  ],
  [
    'Gekko',
    {
      general: [
        'O Wingman (Q) pode plantar ou desarmar a Spike. Use-o para situações seguras ou para forçar a defesa inimiga a se expor.',
        'O Mosh Pit (C) é excelente para limpar cantos ou para negar o defuse da Spike no pós-plant.',
        'Lembre-se de coletar os globos de suas criaturas (Q, E, X) para poder usá-las novamente no mesmo round.',
      ],
      comps: [
        { mapa: 'Lotus', composicao: ['Gekko', 'Neon', 'Omen', 'Killjoy', 'Fade'] },
      ],
    },
  ],
  [
    'KAY/O',
    {
      general: [
        'A faca PONTO/zero (E) suprime as habilidades inimigas e revela quem está na área. É uma ferramenta de informação poderosa.',
        'Use o FRAG/mento (C) em áreas onde inimigos estão presos por outras habilidades para maximizar o dano.',
        'A ultimate, ANULAR/cmd (X), suprime todos os inimigos próximos, permitindo uma entrada de site muito forte. Você pode ser levantado por um aliado se for abatido durante a ult.',
      ],
      comps: [
        { mapa: 'Ascent', composicao: ['KAY/O', 'Jett', 'Omen', 'Sova', 'Killjoy'] },
      ],
    },
  ],
  [
    'Skye',
    {
      general: [
        'O Predador Explosivo (Q) pode ser controlado para limpar ângulos e obter informação. Se acertar um inimigo, ele ficará concusso.',
        'A Luz Desbravadora (E) é um flash que também informa se cegou um inimigo. Use-o para preparar jogadas para seus duelistas.',
        'A ultimate, Rastreadores (X), envia três projéteis que caçam os inimigos mais próximos, revelando sua posição.',
      ],
      comps: [
        { mapa: 'Bind', composicao: ['Skye', 'Raze', 'Viper', 'Brimstone', 'Sova'] },
      ],
    },
  ],
  [
    'Sova',
    {
      general: [
        'A Flecha Rastreadora (E) é sua principal fonte de informação. Aprenda alguns "lineups" para revelar bombsites inteiros de locais seguros.',
        'O Drone Coruja (C) é perfeito para limpar ângulos próximos e marcar inimigos antes de sua equipe avançar.',
        'A ultimate, Fúria do Caçador (X), pode atravessar paredes. Use-a para finalizar inimigos revelados ou em situações de pós-plant.',
      ],
      comps: [
        { mapa: 'Ascent', composicao: ['Sova', 'Jett', 'Omen', 'KAY/O', 'Killjoy'] },
      ],
    },
  ],

  // --- CONTROLADORES ---
  [
    'Astra',
    {
      general: [
        'Gerencie suas estrelas com cuidado. Coloque-as em posições estratégicas no início do round para reagir rapidamente.',
        'Use a Pulso Nova (Q) para concussar inimigos antes de um duelo e a Nebulosa (E) para criar smokes rápidas.',
        'A ultimate, Divisa Cósmica (X), divide o mapa ao meio, abafando o som e bloqueando tiros. É ótima para plantar ou desarmar a Spike com segurança.',
      ],
      comps: [
        { mapa: 'Lotus', composicao: ['Astra', 'Raze', 'Skye', 'Viper', 'Killjoy'] },
      ],
    },
  ],
  [
    'Brimstone',
    {
      general: [
        'Sua Fumaça Celeste (E) é a mais rápida de ser posicionada. Use as três de uma vez para executar uma entrada rápida em um bombsite.',
        'O Sinalizador Estimulante (C) aumenta a velocidade de tiro de todos os aliados próximos. Ótimo para entradas e retakes.',
        'A ultimate, Ataque Orbital (X), é perfeita para limpar um bombsite para o plant ou para negar o defuse da Spike.',
      ],
      comps: [
        { mapa: 'Bind', composicao: ['Brimstone', 'Raze', 'Skye', 'Viper', 'Sova'] },
      ],
    },
  ],
  [
    'Harbor',
    {
      general: [
        'A Cascata (C) é uma parede de água que avança, bloqueando a visão e desacelerando inimigos. Use-a para avançar com segurança.',
        'A Maré Alta (E) cria uma parede de água longa e curvável. Ótima para dividir bombsites em dois.',
        'A ultimate, Acerto de Contas (X), avança e causa concussão em inimigos em uma grande área, facilitando a tomada de espaço.',
      ],
      comps: [
        { mapa: 'Lotus', composicao: ['Harbor', 'Viper', 'Fade', 'Omen', 'Raze'] },
      ],
    },
  ],
  [
    'Omen',
    {
      general: [
        'O Manto Sombrio (E) tem um longo alcance e se regenera. Use-o para smocar posições agressivas e recuadas durante o round.',
        'O Paranoia (Q) é um flash que atravessa paredes, perfeito para cegar múltiplos inimigos antes de uma entrada.',
        'A ultimate, Salto das Sombras (X), permite que você se teletransporte para qualquer lugar no mapa. Use para flanquear ou para pegar a Spike em segurança.',
      ],
      comps: [
        { mapa: 'Ascent', composicao: ['Omen', 'Jett', 'Sova', 'KAY/O', 'Killjoy'] },
      ],
    },
  ],
  [
    'Viper',
    {
      general: [
        'Sua Cortina Tóxica (E) é excelente para dividir um bombsite ao meio, permitindo um plant mais seguro.',
        'Use a Nuvem Venenosa (Q) para criar "one-ways" ou para plantar a Spike dentro dela.',
        'A ultimate, Poço Peçonhento (X), é uma das melhores habilidades para garantir um pós-plant. Jogue dentro dela e espere o inimigo entrar.',
      ],
      comps: [
        { mapa: 'Icebox', composicao: ['Viper', 'Jett', 'Sova', 'KAY/O', 'Killjoy'] },
        { mapa: 'Bind', composicao: ['Viper', 'Brimstone', 'Skye', 'Raze', 'Sova'] },
      ],
    },
  ],
  [
    'Clove',
    {
      general: [
        'Sua principal vantagem é poder usar fumaças (Artimanha - E) mesmo depois de morrer. Use isso para ajudar seu time mesmo que você seja abatido na entrada.',
        'Use a Revitalização (Q) para "curar" vida temporária antes de um duelo, o que pode te dar a vantagem.',
        'A ultimate, Ainda Não Morri (X), te dá uma segunda chance. Use-a para tentar reverter um round em desvantagem numérica.',
      ],
      comps: [
        { mapa: 'Split', composicao: ['Clove', 'Raze', 'Skye', 'Cypher', 'KAY/O'] },
      ],
    },
  ],

  // --- SENTINELAS ---
  [
    'Chamber',
    {
      general: [
        'O teleporte, Rendezvous (E), é sua principal ferramenta. Mantenha uma âncora em um local seguro para poder atirar e recuar instantaneamente.',
        'Use a Caçador de Cabeças (Q) em rounds de economia para ter uma arma forte sem gastar muito.',
        'A ultimate, Tour de Force (X), cria um Operator poderoso. Conseguir um abate cria um campo de lentidão, atrasando o avanço inimigo.',
      ],
      comps: [
        { mapa: 'Sunset', composicao: ['Chamber', 'Omen', 'Fade', 'KAY/O', 'Raze'] },
      ],
    },
  ],
  [
    'Cypher',
    {
      general: [
        'Use a Jaula Cibernética (C) para criar "one-ways" ou para bloquear a visão após um fio ser ativado.',
        'A Câmera de Vigilância (E) é ótima para observar flancos ou para obter informação segura sobre um bombsite.',
        'A ultimate, Assalto Neural (X), revela a posição de todos os inimigos vivos. Use em um corpo recente para garantir um round.',
      ],
      comps: [
        { mapa: 'Split', composicao: ['Cypher', 'Raze', 'Omen', 'Skye', 'Viper'] },
      ],
    },
  ],
  [
    'Deadlock',
    {
      general: [
        'O Sensor Sônico (Q) detecta sons e causa concussão. Use-o para cobrir flancos ou entradas de bombsites.',
        'A Rede-Armadilha (C) prende o primeiro inimigo que passa, forçando-o a remover a rede e ficar vulnerável.',
        'A ultimate, Aniquilação (X), captura um inimigo em um casulo. É extremamente forte para criar uma vantagem numérica instantânea.',
      ],
      comps: [
        { mapa: 'Lotus', composicao: ['Deadlock', 'Raze', 'Omen', 'Fade', 'Killjoy'] },
      ],
    },
  ],
  [
    'Killjoy',
    {
      general: [
        'A Torreta (E) é sua principal ferramenta. Coloque-a em posições que cubram uma grande área para obter informação e dano inicial.',
        'Use o Robô de Alarme (Q) em conjunto com os Enxames de Nanitas (C) para criar uma armadilha mortal.',
        'A ultimate, Confinamento (X), detém todos os inimigos em uma grande área. É uma das melhores habilidades para garantir o plant ou retake de um bombsite.',
      ],
      comps: [
        { mapa: 'Ascent', composicao: ['Killjoy', 'Jett', 'Omen', 'Sova', 'KAY/O'] },
      ],
    },
  ],
  [
    'Sage',
    {
      general: [
        'O Orbe de Cura (E) pode curar você ou um aliado. Tente ficar em uma posição segura enquanto cura um companheiro de equipe.',
        'O Orbe de Lentidão (Q) é excelente para atrasar avanços inimigos ou para dificultar a fuga deles.',
        'A Orbe de Barreira (C) pode ser usada defensivamente para bloquear passagens ou ofensivamente para criar posições elevadas inesperadas.',
      ],
      comps: [
        { mapa: 'Icebox', composicao: ['Sage', 'Viper', 'Jett', 'Sova', 'KAY/O'] },
      ],
    },
  ],
]);