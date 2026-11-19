export const site = {
  name: 'Felipe Mello Padula',
  role: 'Creative Art Director',
  email: 'felipe@felipempadula.com',
  whatsapp: '5513991188903',
  whatsappLabel: '+55 13 99118 8903',
  linkedin: 'https://www.linkedin.com/in/fmellopadula',
  instagram: 'https://www.instagram.com/felipempadula.d.a',
  // Same Formspree form as the previous site, so messages land in the same inbox
  formEndpoint: 'https://formspree.io/f/mblnzewd',
}

export const waLink = (msg = '') =>
  `https://wa.me/${site.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
