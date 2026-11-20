import { createContext, useContext, useEffect, useState, useCallback } from 'react'

/*
  All interface copy lives here. Project copy lives in src/data/projects.js.
  Every string has an "en" and a "pt" version.
*/
export const dict = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close' },
    hero: {
      eyebrow: 'Portfolio 2026',
      line1: 'Creative',
      line2: 'Art Director',
      lead: 'I make',
      words: ['campaigns.', 'films.', 'AI productions.', 'brands.', 'ideas that travel.'],
      location: 'São Paulo-SP / Brazil',
      scroll: 'Selected work',
    },
    lowdown: {
      lead: 'I’m an art director building ideas across integrated, OOH, print and social, from the first sketch to the final frame.',
      more: 'Recognized at One Show Young Ones 2026. Recent work includes',
      and: ' and ',
      city: 'SÃO PAULO',
      worldwide: 'AVAILABLE WORLDWIDE',
      bioMore: 'Read the full bio',
      bioLess: 'Show less',
    },
    list: { view: 'View case' },
    project: {
      client: 'Client',
      year: 'Year',
      services: 'Services',
      role: 'Role',
      type: 'Type',
      next: 'Next project',
      back: 'All work',
      problem: 'The problem',
      insight: 'The insight',
      idea: 'The idea',
      pr: 'PR',
      howItWorks: 'How it works',
      credits: 'Credits',
      work: 'The work',
      playFilm: 'Play the film',
      watchOnVimeo: 'Watch on Vimeo',
      notFound: 'Project not found.',
    },
    about: {
      eyebrow: 'About',
      title: 'Ideas first. Craft always. AI when it makes the idea bigger.',
      // Bio being tested. To go back, About.jsx renders a.bioPrevious instead of a.bio
      bio: [
        'I think one of the hardest things is talking about yourself. Not for lack of words or stories, but because when you’re inside your own life, you can’t always see everything that’s happening around you.',
        'My first big hobby was riding my bike. As a kid, I loved that feeling of freedom. There’s something powerful about choosing a path and setting off to discover the world, even when that world was still just the streets of my neighborhood.',
        'At 14, after a lot of negotiating with my dad, I got my first guitar. That same year came the first bands and the first rehearsals with school friends. Music opened a door to a different way of expressing myself.',
        'Reading came a little later. It was only after I finished school that I really took to books. I think being made to read whatever others chose for me kept me away from that world. When I discovered I could choose my own stories, I realized how addictive reading could be. It’s a habit I keep to this day.',
        'Then came films, photography, art and painting. Little by little, I began to see how much creativity was already in me, in my imagination and in the way I saw things.',
        'At Mackenzie, studying Advertising, I deepened those ties and began to understand that I could turn all of it into a profession. It was also toward the end of that chapter that my wife came into my life. She has always encouraged me and helped me see the world in brighter colors, pushing my creative side even further.',
        'After Mackenzie, I dove even deeper into the world of advertising. I learned more about the work of Marcello Serpa, Nizan Guanaes, Carlos Domingos and so many others who helped build the history of creative advertising in Brazil. I also came to admire agencies like Lew’Lara and F/Nazca, among many others doing incredible work here.',
        'All of that led me to art direction. I started as a junior art director in 2008, working with retail, healthcare and beauty clients. Every project taught me something new and showed me how graphic design can be a passion too.',
        'I haven’t stopped since. At every agency I found a different experience, a campaign, a way of working and a new perspective. I’ve freelanced for clients abroad, collaborated with international agencies and ran my own 3D studio.',
        'After the pandemic, I noticed new media and new ways of creating campaigns popping up everywhere. I went back to school at Miami Ad School, where I sharpened my creative thinking and made friends I’ll carry with me for life.',
        'That path took me to a job in Singapore. And who knows where the next chapter begins?',
        'Maybe it’s with you, who just read this short bio. Shall we talk?',
      ],
      // Previous bio, kept in case we switch back
      bioPrevious: [
        'I’m Felipe Mello Padula, a Creative Art Director from Brazil with more than 15 years in advertising, building ideas from the first sketch to the final frame.',
        'My practice combines concept, art direction, design and film, and for the last three years, AI production too. The medium changes. The standard for a sharp idea does not.',
        'Trained at Miami Ad School under senior CCOs. Currently I’m Senior Art Director at Final Upgrade Singapore, where I create work for global brands.',
      ],
      portraitAlt: 'Studio portrait of Felipe Mello Padula, arms crossed',
      facts: [['Role', 'Creative Art Director'], ['Based in', 'São Paulo, Brazil'], ['Available', 'Worldwide']],
      clientsTitle: 'Selected brands',
      servicesTitle: 'What I do',
      services: ['Creative Direction', 'Art Direction', 'Campaign Concepts', 'AI Film Production', 'Key Visuals', 'Branding'],
      cta: 'Let’s talk',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Have a project in mind?',
      sub: 'Currently taking on new work. Say hello.',
      name: 'Name',
      email: 'Email',
      namePh: 'Your name',
      emailPh: 'email@example.com',
      messagePh: 'What are we making?',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      ok: 'Message sent. I’ll get back to you shortly.',
      err: 'Something went wrong. Try again or reach me on WhatsApp.',
      required: 'Please fill in name, email and message.',
      whatsapp: 'Chat on WhatsApp',
      whatsappMsg: 'Hi Felipe! I saw your portfolio and would like to talk about a project.',
      or: 'or talk to me directly',
    },
    footer: { rights: 'All rights reserved.', top: 'Back to top' },
    notFound: { title: 'Page not found', back: 'Back home' },
  },
  pt: {
    nav: { work: 'Trabalhos', about: 'Sobre', contact: 'Contato', menu: 'Menu', close: 'Fechar' },
    hero: {
      eyebrow: 'Portfolio 2026',
      line1: 'Creative',
      line2: 'Art Director',
      lead: 'Eu crio',
      words: ['campanhas.', 'filmes.', 'produções com IA.', 'marcas.', 'ideias que viajam.'],
      location: 'São Paulo-SP / Brasil',
      scroll: 'Trabalhos selecionados',
    },
    lowdown: {
      lead: 'Sou diretor de arte e construo ideias em integrado, OOH, impresso e social, do primeiro rascunho ao frame final.',
      more: 'Reconhecido no One Show Young Ones 2026. Trabalhos recentes incluem',
      and: ' e ',
      city: 'SÃO PAULO',
      worldwide: 'DISPONÍVEL NO MUNDO TODO',
      bioMore: 'Ler a bio completa',
      bioLess: 'Mostrar menos',
    },
    list: { view: 'Ver case' },
    project: {
      client: 'Cliente',
      year: 'Ano',
      services: 'Serviços',
      role: 'Função',
      type: 'Tipo',
      next: 'Próximo projeto',
      back: 'Todos os trabalhos',
      problem: 'O problema',
      insight: 'O insight',
      idea: 'A ideia',
      pr: 'PR',
      howItWorks: 'Como funciona',
      credits: 'Ficha técnica',
      work: 'As peças',
      playFilm: 'Ver o filme',
      watchOnVimeo: 'Ver no Vimeo',
      notFound: 'Projeto não encontrado.',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Ideia primeiro. Craft sempre. IA quando ela deixa a ideia maior.',
      // Bio em teste. Para voltar, About.jsx renderiza a.bioPrevious em vez de a.bio
      bio: [
        'Acho que uma das coisas mais difíceis é falar sobre si mesmo. Não por falta de palavras ou histórias, mas porque, quando estamos dentro da própria vida, nem sempre conseguimos enxergar tudo o que acontece ao nosso redor.',
        'Meu primeiro grande hobby foi andar de bicicleta. Quando criança, eu adorava aquela sensação de liberdade. Existe algo poderoso em poder escolher um caminho e sair descobrindo o mundo, mesmo que ele ainda se resumisse às ruas do bairro.',
        'Aos 14 anos, depois de muita negociação com meu pai, consegui minha primeira guitarra. Naquele mesmo ano vieram as primeiras bandas e os primeiros ensaios com amigos do colégio. A música abriu uma porta para uma forma diferente de me expressar.',
        'A leitura chegou um pouco depois. Só quando terminei o colégio tomei gosto pelos livros. Acho que a obrigação de ler aquilo que escolhiam por mim acabou me afastando desse universo. Quando descobri que podia escolher minhas próprias histórias, percebi como ler podia ser viciante. É um hábito que mantenho até hoje.',
        'Vieram também os filmes, a fotografia, as artes e a pintura. Aos poucos, fui percebendo o quanto a criatividade já estava presente em mim, na minha imaginação e na maneira como eu via as coisas.',
        'No Mackenzie, estudando Publicidade e Propaganda, aprofundei esses laços e comecei a entender que poderia transformar tudo aquilo em uma profissão. Foi também no fim dessa fase que minha esposa entrou na minha vida. Ela sempre me incentivou e me ajudou a enxergar o mundo de uma forma mais colorida, impulsionando ainda mais meu lado criativo.',
        'Depois do Mackenzie, mergulhei ainda mais no universo da publicidade. Descobri mais sobre o trabalho de Marcello Serpa, Nizan Guanaes, Carlos Domingos e tantos outros nomes que ajudaram a construir a história da criação no Brasil. Também passei a admirar agências como Lew’Lara e F/Nazca, entre tantas outras que faziam um trabalho incrível por aqui.',
        'Tudo isso me levou à direção de arte. Comecei como diretor de arte júnior em 2008, trabalhando com clientes de varejo, saúde e beleza. Cada projeto me ensinou algo novo e me fez descobrir como o design gráfico também pode ser apaixonante.',
        'Desde então, não parei mais. Em cada agência, encontrei uma experiência diferente, uma campanha, uma maneira de fazer e um novo olhar. Trabalhei como freelancer para o exterior, colaborei com agências internacionais e tive meu próprio estúdio de 3D.',
        'Depois da pandemia, percebi que novas mídias e novas formas de criar campanhas estavam surgindo por toda parte. Voltei a estudar na Miami Ad School, onde refinei meu pensamento criativo e fiz amigos que certamente vou levar para a vida toda.',
        'Essa trajetória me levou até um trabalho em Singapura. E quem sabe onde começa o próximo capítulo?',
        'Talvez seja com você, que acabou de ler esta breve bio. Bora conversar?',
      ],
      // Bio anterior, guardada caso a gente volte
      bioPrevious: [
        'Sou Felipe Mello Padula, Creative Art Director brasileiro com mais de 15 anos de publicidade, construindo ideias do primeiro rabisco ao frame final.',
        'Meu trabalho junta conceito, direção de arte, design e filme e, nos últimos três anos, produção com IA também. O meio muda. A régua para uma ideia afiada, não.',
        'Formado na Miami Ad School com mentoria de CCOs seniores. Atualmente sou Senior Art Director na Final Upgrade Singapore, onde crio trabalhos para marcas globais.',
      ],
      portraitAlt: 'Retrato de estúdio de Felipe Mello Padula, de braços cruzados',
      facts: [['Função', 'Creative Art Director'], ['Base', 'São Paulo, Brasil'], ['Disponível', 'No mundo todo']],
      clientsTitle: 'Marcas selecionadas',
      servicesTitle: 'O que eu faço',
      services: ['Direção de Criação', 'Direção de Arte', 'Conceito de Campanha', 'Produção de Filmes com IA', 'Key Visuals', 'Branding'],
      cta: 'Vamos conversar',
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Tem um projeto em mente?',
      sub: 'Aberto a novos projetos. Manda um oi.',
      name: 'Nome',
      email: 'Email',
      namePh: 'Seu nome',
      emailPh: 'email@exemplo.com',
      messagePh: 'O que vamos criar?',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      ok: 'Mensagem enviada. Respondo em breve.',
      err: 'Algo deu errado. Tente de novo ou chame no WhatsApp.',
      required: 'Preencha nome, email e mensagem.',
      whatsapp: 'Falar no WhatsApp',
      whatsappMsg: 'Oi Felipe! Vi seu portfólio e quero conversar sobre um projeto.',
      or: 'ou fale direto comigo',
    },
    footer: { rights: 'Todos os direitos reservados.', top: 'Voltar ao topo' },
    notFound: { title: 'Página não encontrada', back: 'Voltar para a home' },
  },
}

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('fmp-lang')
    if (saved === 'en' || saved === 'pt') return saved
  } catch { /* storage unavailable */ }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try { localStorage.setItem('fmp-lang', lang) } catch { /* ignore */ }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'pt' : 'en')), [])

  // tx() picks the right language from a {en, pt} object, or returns plain strings as is
  const tx = useCallback(
    (v) => {
      if (v == null) return ''
      if (typeof v === 'string' || Array.isArray(v)) return v
      return v[lang] ?? v.en ?? ''
    },
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: dict[lang], tx }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
