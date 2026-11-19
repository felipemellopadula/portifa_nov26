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
      p1: 'I’m Felipe Mello Padula, a Creative Art Director from Brazil with more than 15 years in advertising, building ideas from the first sketch to the final frame.',
      p2: 'My practice combines concept, art direction, design and film, and for the last three years, AI production too. The medium changes. The standard for a sharp idea does not.',
      p3: 'Trained at Miami Ad School under senior CCOs. Currently I’m Senior Art Director at Final Upgrade Singapore, where I create work for global brands.',
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
      p1: 'Sou Felipe Mello Padula, Creative Art Director brasileiro com mais de 15 anos de publicidade, construindo ideias do primeiro rabisco ao frame final.',
      p2: 'Meu trabalho junta conceito, direção de arte, design e filme e, nos últimos três anos, produção com IA também. O meio muda. A régua para uma ideia afiada, não.',
      p3: 'Formado na Miami Ad School com mentoria de CCOs seniores. Atualmente sou Senior Art Director na Final Upgrade Singapore, onde crio trabalhos para marcas globais.',
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
